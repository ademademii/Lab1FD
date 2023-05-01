using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Food_delivery_app_LabCouse1.Models
{
    public class Ushqimi
    {
        [Key]
        public int UshqimiID { get; set; }
        public string Emri { get; set; }
        public int SasiaDisponueshme { get; set; }
        public bool isAvailable { get; set; }  
    }
}
