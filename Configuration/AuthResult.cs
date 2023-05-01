using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Food_delivery_app_LabCouse1.Models.DTOs.Requests;
using Microsoft.AspNetCore.Identity;

namespace Food_delivery_app_LabCouse1.Configuration
{
    public class AuthResult
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public bool Success { get; set; }
        public List<string> Errors { get; set; }

        public IdentityUser User { get; set; }

        public  IList<string> Roles { get; set; }
    }
}
