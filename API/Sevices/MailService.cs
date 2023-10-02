using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using Domain;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MimeKit;

namespace API.Sevices
{
    public interface IMailService
    {
        Task SendEmailAsync(
            string email,
            string subject,
            string body,
            string name,
            string toEmail,
            int Otp,
            int Type // 0 - Create 1- Forgot
        );
    }

    public class MailService : IMailService
    {
        private readonly ILogger _logger;

        private readonly MailSettings _mailSettings;
        private readonly IWebHostEnvironment _env;

        public MailService(
            IOptions<MailSettings> mailSettings,
            IWebHostEnvironment env,
            ILogger<MailService> logger
        )
        {
            _mailSettings = mailSettings.Value;
            _env = env;
            _logger = logger;
        }

        public async Task SendEmailAsync(
            string email,
            string subject,
            string body,
            string name,
            string toEmail,
            int Otp,
            int Type
        )
        {
            try
            {
                string templateFolder = "/wwwroot/templates/";
                string fileName = (Type == 0) ? "WelcomeTemplate.html" : "ForgotTemplate.html";
                string filePath = Directory.GetCurrentDirectory() + templateFolder + fileName;
                string MailText = string.Empty;

                using (StreamReader reader = new StreamReader(filePath))
                {
                    MailText = reader.ReadToEnd();
                }

                var data = new
                {
                    email = toEmail,
                    password = "password",
                    firsttime = true,
                    otp = Otp
                };

                var mode = Type == 0 ? 0 : 1;

                // Serialize the object to JSON
                string json = JsonSerializer.Serialize(data);

                // Convert the JSON string to bytes
                byte[] bytes = Encoding.UTF8.GetBytes(json);

                // Encode the bytes using Base64
                string encodedString = Convert.ToBase64String(bytes);

                // Serialize the object to JSON
                string json1 = JsonSerializer.Serialize(mode);

                // Convert the JSON string to bytes
                byte[] bytes1 = Encoding.UTF8.GetBytes(json1);

                // Encode the bytes using Base64
                string encodedString1 = Convert.ToBase64String(bytes1);

                string route =
                    Type == 0
                        ? "http://balticmallus.com/Login"
                        : "http://balticmallus.com/changepwd";

                // Create a link with the encoded string as a query parameter
                UriBuilder uriBuilder = new UriBuilder(route);
                uriBuilder.Query =
                    $"data={Uri.EscapeDataString(encodedString)}&mode={Uri.EscapeDataString(encodedString1)}";
                string link = uriBuilder.ToString();

                MailText = MailText
                    .Replace("@Name", name)
                    .Replace("@Email", toEmail)
                    .Replace("@Link", link);

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Mail));
                message.To.Add(new MailboxAddress(name, email));
                message.Subject =
                    Type == 0 ? $"Welcome {name}" : $"Change password for BalticMallus.com";

                var builder = new BodyBuilder();
                builder.HtmlBody = MailText;
                message.Body = builder.ToMessageBody();

                using (var client = new SmtpClient())
                {
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                    if (_env.IsDevelopment())
                    {
                        await client.ConnectAsync(_mailSettings.Host, 465, true);
                    }
                    else
                    {
                        await client.ConnectAsync(_mailSettings.Host, _mailSettings.Port, true);
                    }

                    await client.AuthenticateAsync(_mailSettings.Mail, _mailSettings.Password);
                    var result = await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }
    }
}
