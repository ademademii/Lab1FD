using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Food_delivery_app_LabCouse1.Models.DTOs.Requests
{
    public class TokenRequest
    {
        //the current jwt token that the client has
        [Required]
        public string Token { get; set; }
        //the refreshed token that client gets
        [Required]
        public string RefreshToken { get; set; }
    }
}
