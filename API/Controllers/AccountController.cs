using System;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using API.DTOs;
using API.Sevices;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Twilio;
using Twilio.Rest.Verify.V2;
using Twilio.Rest.Verify.V2.Service;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;

        private readonly IMailService _mailService;

        private readonly ILogger _logger;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            TokenService tokenService,
            IMailService mailService,
            ILogger<ActivitiesController> logger
        )
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _mailService = mailService;
            _logger = logger;
        }

        [HttpPost("forgot")]
        public async Task<ActionResult<UserDto>> Forgot(LoginDto loginDto)
        {
            loginDto.FirstTime = true;
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
                return Unauthorized();
            user.Otp = GenerateOTP();
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                Task<string> emailtask = Forgotemail(user);
                string emailstatus = await emailtask;

                if (emailstatus == "success")
                {
                    await SetRefreshToken(user);
                    return CreateUserObject(user, false);
                }
            }
            return Unauthorized();
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //  var user = await _userManager.FindByNameAsync(loginDto.UserName);

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                ModelState.AddModelError("email", "Email Id does not exists !");
                return ValidationProblem();
            }

            if (loginDto.FirstTime)
            {
                if (user.EmailConfirmed)
                {
                    ModelState.AddModelError("email", "Already a verified user, please sign in");
                    return ValidationProblem();
                }
                else
                {
                    if (user.Otp == loginDto.Otp)
                    {
                        user.Otp = 0;
                        user.EmailConfirmed = true;
                        await _userManager.UpdateAsync(user);
                        return CreateUserObject(user, true);
                    }
                    ModelState.AddModelError("email", "Something went wrong, please try again");
                    return ValidationProblem();
                }
            }
            else
            {
                if (!user.EmailConfirmed)
                {
                    ModelState.AddModelError("email", "Please verify your email");
                    return ValidationProblem();
                }
                var result = await _signInManager.CheckPasswordSignInAsync(
                    user,
                    loginDto.Password,
                    false
                );
                if (result.Succeeded)
                {
                    await SetRefreshToken(user);
                    return CreateUserObject(user, true);
                }
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var user = await _userManager.Users
                .Include(r => r.RefreshTokens)
                .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

            if (user == null)
                return Unauthorized();
            var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

            if (oldToken != null && !oldToken.isActive)
                return Unauthorized();

            return CreateUserObject(user, true);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            registerDto.Otp = GenerateOTP();

            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "User exists already");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = registerDto.Email,
                Otp = registerDto.Otp,
                PhoneNumberConfirmed = false,
                EmailConfirmed = false,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!IsEmailValid(registerDto.Email))
            {
                ModelState.AddModelError("email", "Please enter a valid email");
                return ValidationProblem();
            }

            Task<string> emailtask = email(registerDto);
            string emailstatus = await emailtask;

            if (result.Succeeded && emailstatus == "success")
            {
                await SetRefreshToken(user);
                return CreateUserObject(user, false);
            }

            // else
            // {
            //     var twiliostatus = sms(user);
            //     if (result.Succeeded && twiliostatus == "pending")
            //     {
            //         return CreateUserObject(user, false);
            //     }
            // }

            return BadRequest("Problem registering user");
        }

        [HttpPost("changepwd")]
        public async Task<ActionResult<UserDto>> ChangePassword(LoginDto loginDto)
        {
            //  var user = await _userManager.FindByNameAsync(loginDto.UserName);

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
                return Unauthorized();

            // Generate a new password hash
            var newPasswordHash = _userManager.PasswordHasher.HashPassword(user, loginDto.Password);

            // Update the user's password hash
            user.PasswordHash = newPasswordHash;

            // Update the user in the database
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                await SetRefreshToken(user);
                return CreateUserObject(user, true);
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            if (User.FindFirstValue(ClaimTypes.Email) == null)
            {
                return null;
            }
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            await SetRefreshToken(user);
            return CreateUserObject(user, true);
        }

        private string getsid()
        {
            string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
            string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

            TwilioClient.Init(accountSid, authToken);

            var service = ServiceResource.Create(friendlyName: "Rentoli");
            return service.Sid;
        }

        private async Task<String> email(RegisterDto user)
        {
            var result = "failed";
            try
            {
                await _mailService.SendEmailAsync(
                    user.Email,
                    "Activate your BalticMallus account!",
                    "",
                    user.FirstName + " " + user.LastName,
                    user.Email,
                    user.Otp,
                    0
                );
                result = "success";
            }
            catch (Exception ex)
            {
                 _logger.LogError(ex, "An error occurred while sending email");
                ModelState.AddModelError(
                    "email",
                    "Something went wrong while sending email {Detailed error :" + ex.Message + "}"
                );
            }

            return result;
        }

        private async Task<String> Forgotemail(AppUser user)
        {
            var result = "failed";
            try
            {
                await _mailService.SendEmailAsync(
                    user.Email,
                    "Reset your password",
                    "",
                    user.FirstName + " " + user.LastName,
                    user.Email,
                    user.Otp,
                    1
                );
                result = "success";
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(
                    "email",
                    "Something went wrong while sending email {Detailed error :" + ex.Message + "}"
                );
            }

            return result;
        }

        private string sms(AppUser user)
        {
            var verification = VerificationResource.Create(
                to: user.CountryCode + "" + user.PhoneNumber,
                channel: "sms",
                pathServiceSid: user.Sid
            );

            return verification.Status;
        }

        private string verify(AppUser user, string otp)
        {
            string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
            string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

            TwilioClient.Init(accountSid, authToken);

            var verification = VerificationCheckResource.Create(
                to: user.CountryCode + "" + user.PhoneNumber,
                code: otp,
                pathServiceSid: user.Sid
            );

            return verification.Status;
        }

        static bool IsEmailValid(string email)
        {
            // Regular expression pattern for email validation
            string pattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";

            // Check if the email matches the pattern
            return Regex.IsMatch(email, pattern);
        }

        static int GenerateOTP()
        {
            Random random = new Random();
            return random.Next(1000, 10000);
        }

        private async Task SetRefreshToken(AppUser user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);

            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }

        private UserDto CreateUserObject(AppUser user, bool mode)
        {
            return new UserDto
            {
                Token = mode == false ? null : _tokenService.CreateToken(user),
                Id = user.GetId(),
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
            };
        }
    }
}
