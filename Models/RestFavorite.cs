using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Food_delivery_app_LabCouse1.Models
{
    public class RestFavorite
    {
        [Key]
        public int FavID { get; set; }
        public string UserId { get; set; }
        public int RestId { get; set; }


        [ForeignKey(nameof(UserId))]
        public IdentityUser User { get; set; }

        [ForeignKey(nameof(RestId))]
        public Restauranti Restauranti { get; set; }
    }
}
