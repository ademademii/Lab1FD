using Food_delivery_app_LabCouse1.Data;
using Food_delivery_app_LabCouse1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Food_delivery_app_LabCouse1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PijaController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public PijaController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Pija>>> GetPijet()
        {
            return await _db.Pija.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pija>> GetPija(int id)
        {
            return await _db.Pija.FindAsync(id);
        }

        [HttpPost]
        public JsonResult addPija(Pija pija)
        {
            _db.Pija.Add(pija);
            _db.SaveChanges();
            return new JsonResult("Pija u shtua me sukses");
        }

        [HttpPut]
        public JsonResult updatePija(Pija pija)
        {
            _db.Pija.Update(pija);
            _db.SaveChanges();

            return new JsonResult("Pija u perditesua me sukses");
        }

        [HttpDelete("{id}")]
        public JsonResult deletePija(int id)
        {
            var pija = _db.Pija.Find(id);
            _db.Remove(pija);
            _db.SaveChanges();

            return new JsonResult("Pija u fshi me sukses");
        }
    }
}