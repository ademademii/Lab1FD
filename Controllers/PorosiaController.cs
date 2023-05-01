using Food_delivery_app_LabCouse1.Data;
using Food_delivery_app_LabCouse1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Food_delivery_app_LabCouse1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PorosiaController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public PorosiaController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Porosia>>> GetPorosite()
        {
            return await _db.Porosia.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Porosia>>> GetPorositeEKlientit(string id)
        {
            var porosia = await _db.Porosia.Include("User").Where(x => x.UserId.Equals(id)).ToListAsync();
            return porosia;
        }

        [HttpPost] 
        public JsonResult addPorosia(Porosia porosia)
        {
            _db.Porosia.Add(porosia);
            _db.SaveChanges();
            return new JsonResult("Porosia u shtua me sukses");
        }

        [HttpPut]
        public JsonResult updatePorosia(Porosia porosia)
        {
            _db.Porosia.Update(porosia);
            _db.SaveChanges();

            return new JsonResult("Porosia u perditesua me sukses");
        }

        [HttpDelete("{id}")]
        public JsonResult deletePorosia(int id)
        {
            var porosia = _db.Porosia.Find(id);
            _db.Remove(porosia);
            _db.SaveChanges();

            return new JsonResult("Porosia u fshi me sukses");
        }
    }
}