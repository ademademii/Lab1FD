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
    public class UshqimiController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public UshqimiController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ushqimi>>> GetUshqimet()
        {
            return await _db.Ushqimi.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ushqimi>> GetUshqimi(int id)
        {
            return await _db.Ushqimi.FindAsync(id);
        }

        [HttpPost]
        public JsonResult addUshqimi(Ushqimi ushqimi)
        {
            _db.Ushqimi.Add(ushqimi);
            _db.SaveChanges();
            return new JsonResult("Ushqimi u shtua me sukses");
        }

        [HttpPut]
        public JsonResult updateUshqimi(Ushqimi ushqimi)
        {
            _db.Ushqimi.Update(ushqimi);
            _db.SaveChanges();

            return new JsonResult("Ushqimi u perditesua me sukses");
        }

        [HttpDelete("{id}")]
        public JsonResult deleteUshqimi(int id)
        {
            var ushqimi = _db.Ushqimi.Find(id);
            _db.Remove(ushqimi);
            _db.SaveChanges();

            return new JsonResult("Ushqimi u fshi me sukses");
        }
    }
}