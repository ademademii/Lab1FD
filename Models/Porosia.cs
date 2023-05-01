using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Food_delivery_app_LabCouse1.Models
{
    public class Porosia
    {
        [Key]
        public int PorosiaId { get; set; }
        public DateTime DataPorosise { get; set; }
        public double CmimiTotal { get; set; }
        public string Adresa { get; set; }
        public string FormaPageses { get; set; }
        //public int CartId { get; set; }
        public string UserId { get; set; }


        [ForeignKey(nameof(UserId))] 
        public IdentityUser User { get; set; }

       // [ForeignKey(nameof(CartId))]
       // public Cart Cart { get; set; }

    }
}
