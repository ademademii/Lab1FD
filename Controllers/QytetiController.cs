using Food_delivery_app_LabCouse1.Data;
using Food_delivery_app_LabCouse1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Food_delivery_app_LabCouse1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QytetiController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public QytetiController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Qyteti>>> GetQytetet()
        {
            return await _db.Qyteti.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Qyteti>> GetQyteti(int id)
        {
            return await _db.Qyteti.FindAsync(id);
        }
        
        [HttpPost]
        public JsonResult addQytetin(Qyteti qyteti){
                _db.Qyteti.Add(qyteti);
                _db.SaveChanges();
                return new JsonResult("Qyteti u shtua me sukses");
        }

        [HttpPut]
        public JsonResult updateQytetin(Qyteti qyteti)
        {
            _db.Qyteti.Update(qyteti);
            _db.SaveChanges();

            return new JsonResult("Qyteti u perditesua me sukses");
        }

        [HttpDelete("{id}")]
        public JsonResult deleteQytetin(int id)
        {
           var qyteti = _db.Qyteti.Find(id);
           _db.Remove(qyteti);
           _db.SaveChanges();

            return new JsonResult("Qyteti u fshi me sukses");
        }
    }
}
