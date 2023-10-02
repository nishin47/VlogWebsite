namespace API.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }

        public string PhoneNumber { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int ResultCode {get;set;}  // 1 Email sent successfully
    }
}
