using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Food_delivery_app_LabCouse1.Models
{
    public class Restauranti
    {
        [Key]
        public int RestaurantID { get; set; }
        public string Emri { get; set; }
        public DateTime Data_regjistrimit { get; set; }
        public int NrYjeve { get; set; }
        public string Foto { get; set; }
        public string Pershkrimi { get; set; }
        public int QytetiID { get; set; }
        [ForeignKey("QytetiID")]
        public Qyteti Qyteti { get; set; }
    }
}
