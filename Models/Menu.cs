using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Food_delivery_app_LabCouse1.Models
{
    public class Menu
    {
        [Key]
        public int MenuID { get; set; }
        public string Emertimi { get; set; }
        public string Pershkrimi { get; set; }
        public double Cmimi { get; set; }
        public int Nr_artikujve { get; set; }
        public bool isAvailable { get; set; }
        //lidhja e tabeles menu me tabelen restaurant
        public int RestaurantID { get; set; }
        [ForeignKey("RestaurantID")]
        public Restauranti Restauranti { get; set; }
        //lidhja e menu me pije
        public int PijaID { get; set; }
        [ForeignKey("PijaID")]
        public Pija Pija { get; set; }
        //lidhja e menu me ushqim
        public int UshqimiID { get; set; }
        [ForeignKey("UshqimiID")]
        public Ushqimi Ushqimi { get; set; }

    }
}
