using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        [Key]
        private string id;

        public string GetId()
        {
            return id;
        }

        public void SetId(string value)
        {
            id = value;
        }

        private string phonenumber;

        public string GetPhoneNumber()
        {
            return phonenumber;
        }

        public void SetPhoneNumber(string value)
        {
            phonenumber = value;
        }

        public string CountryCode { get; set; }

        public string Sid { get; set; }

        private bool phonenumberconfirmed { get; set; }

        private bool emailconfirmed { get; set; }

        private string email { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int Otp { get; set; }

        public ICollection<RefreshToken> RefreshTokens {get; set;} = new List<RefreshToken> ();
    }
}
