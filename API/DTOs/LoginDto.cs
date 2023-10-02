namespace API.DTOs
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool FirstTime { get; set; }
        public int Otp { get; set; }
    }
}
