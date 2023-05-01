using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Food_delivery_app_LabCouse1.Models
{
    public class Vleresimet
    {
        [Key]
        public int VlersimiID { get; set; }
        public string Vleresimi { get; set; }
        public int MenuID { get; set; }

        [ForeignKey(nameof(MenuID))]
        public Menu Menu { get; set; }
    }
}
