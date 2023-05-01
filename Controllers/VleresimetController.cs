using Food_delivery_app_LabCouse1.Data;
using Food_delivery_app_LabCouse1.Models;
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
    public class VleresimetController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public VleresimetController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vleresimet>>> GetVleresimet()
        {
            return await _db.Vleresimet.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vleresimet>> GetVleresimein(int id)
        {
            return await _db.Vleresimet.FindAsync(id);
        }

        [HttpPost]
        public JsonResult addVleresimin(Vleresimet vleresimet)
        {
            _db.Vleresimet.Add(vleresimet);
            _db.SaveChanges();
            return new JsonResult("Vleresimi u shtua me sukses");
        }

        [HttpPut]
        public JsonResult updateVleresimi(Vleresimet vleresimet)
        {
            _db.Vleresimet.Update(vleresimet);
            _db.SaveChanges();

            return new JsonResult("Vleresimi u perditesua me sukses");
        }

        [HttpDelete("{id}")]
        public JsonResult deleteVleresimi(int id)
        {
            var vleresimi = _db.Vleresimet.Find(id);
            _db.Remove(vleresimi);
            _db.SaveChanges();

            return new JsonResult("Vleresimi u fshi me sukses");
        }
    }
}