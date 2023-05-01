using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Food_delivery_app_LabCouse1.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        //public int PorosiaId { get; set; }
        public int MenuId { get; set; }

        //lidhja me tabelen AspUsers
        [ForeignKey(nameof(UserId))]
        public IdentityUser User { get; set; }
        //lidhja me tabelen menu
        [ForeignKey(nameof(MenuId))]
        public Menu Menu { get; set; }
        //lidhja me tabelen porosia
        //[ForeignKey(nameof(PorosiaId))]
        //public Porosia Porosia { get; set; }
        //public Porosia porosia { get; set; }
    }
}
