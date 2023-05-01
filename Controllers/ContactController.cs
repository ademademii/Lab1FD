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
using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Food_delivery_app_LabCouse1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public ContactController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<ContactUs>>> GetKontaktet()
        {
            return await _db.ContactUs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactUs>> GetKontaktin(int id)
        {
            return await _db.ContactUs.FindAsync(id);
        }

        [HttpPost]
        public JsonResult addKontaktin(ContactUs kontakti)
        {
            _db.ContactUs.Add(kontakti);
            _db.SaveChanges();
            return new JsonResult("Mesazhi u dergua me sukses");
        }

        [HttpDelete("{id}")]
        public JsonResult deleteKontakti(int id)
        {
            var kontakti = _db.ContactUs.Find(id);
            _db.Remove(kontakti);
            _db.SaveChanges();

            return new JsonResult("Mesazhi u fshi me sukses");
        }
    }
}