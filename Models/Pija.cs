using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Food_delivery_app_LabCouse1.Models
{
    public class Pija
    {
        [Key]
        public int PijaID { get; set; }
        public string Emri { get; set; }
        public int SasiaPijeve { get; set; }
        public bool isAvailable { get; set; }
        public string Pershkrimi { get; set; }

    }
}
