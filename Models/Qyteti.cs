using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Food_delivery_app_LabCouse1.Models
{
    public class Qyteti

    {
        [Key]
        public int QytetiID { get; set; }

        public string Emri { get; set; }
    }
}
