using Food_delivery_app_LabCouse1.Data;
using Food_delivery_app_LabCouse1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Food_delivery_app_LabCouse1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TelefoniController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public TelefoniController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Telefoni>>> GetTelefoni()
        {
            return await _db.Telefoni.Include("User").ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Telefoni>> GetTelefoni(int id)
        {
            return await _db.Telefoni.FindAsync(id);
        }

        [HttpPost]
        public JsonResult addTelefoni(Telefoni telefoni)
        {
            _db.Telefoni.Add(telefoni);
            _db.SaveChanges();
            return new JsonResult("Numri i telefonit u shtua me sukses");
        }

        [HttpPut]
        public JsonResult updateTelefoni(Telefoni telefoni)
        {
            _db.Telefoni.Update(telefoni);
            _db.SaveChanges();

            return new JsonResult("Numri i telefonit u perditesua me sukses");
        }

        [HttpDelete("{id}")]
        public JsonResult deleteTelefonit(int id)
        {
            var telefoni = _db.Telefoni.Find(id);
            _db.Remove(telefoni);
            _db.SaveChanges();

            return new JsonResult("Numri i telefonit u fshi me sukses");
        }
    }
}