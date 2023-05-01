using Food_delivery_app_LabCouse1.Data;
using Food_delivery_app_LabCouse1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Food_delivery_app_LabCouse1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        private string path;

        private string placeholder;

        public RestaurantController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Restauranti>> GetRestoranti(int id)
        {
            return await _db.Restauranti.FindAsync(id);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles="Administrator")] 
        public JsonResult addRestoranti(Restauranti restoranti){
                _db.Restauranti.Add(restoranti);
            
                _db.SaveChanges();
                return new JsonResult("Restoranti u shtua me sukses");
        }

         [HttpGet]
         public async Task<ActionResult<List<Restauranti>>> GetRestorantet()
         {
             return await _db.Restauranti.Include("Qyteti").ToListAsync();
         }

        //metoda per kerkim te restauranteve nga search bar
        [HttpGet("search/{str}")]
        public async Task<ActionResult<List<Restauranti>>> GetSearchAsync(string str)
        {
            var result = await _db.Restauranti.FromSqlRaw("SELECT * FROM dbo.Restauranti where emri like '" + str + "%'").ToListAsync();
            if(result.Count()<1)
            {
                return new JsonResult("Kerkimi juaj nuk u gjend!");
            }
            return result;
        }

        //metoda per te filtruar sipas qyteteve
        [HttpGet("filter/{id}")]
        public async Task<ActionResult<List<Restauranti>>> GetFiltersAsync(int id)
        {
            var result = await _db.Restauranti.FromSqlRaw("SELECT * FROM dbo.Restauranti where qytetiID like '" + id + "%'").ToListAsync();
            return result;
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles="Administrator")] 
        public JsonResult updateRestoranti(Restauranti restoranti)
        {
            _db.Restauranti.Update(restoranti);
            _db.SaveChanges();

            return new JsonResult("Restoranti u perditesua me sukses");
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles="Administrator")] 
        public JsonResult deleteRestoranti(int id)
        {
           var restoranti = _db.Restauranti.Find(id);

           _db.Remove(restoranti);
           _db.SaveChanges();

            return new JsonResult("Restoranti u fshi me sukses");
        }
    }
}
