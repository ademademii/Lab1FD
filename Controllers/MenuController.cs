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
    public class MenuController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public MenuController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Menu>>> GetMenute()
        {
            return await _db.Menu.Include("Restauranti").ToListAsync();
        }

        //Kjo metode kthen krejt menute qe i takojne ni restaurantit
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Menu>>> GetMenuAsync(int id)
        {
            var menu = await _db.Menu.Include("Restauranti")
            .Include("Pija")
            .Include("Ushqimi")
            .Where(x => x.RestaurantID == id).ToListAsync();
            return menu;
        }

        //kjo metod do te perdoret per te kerkuar menu-te
        [HttpGet("search/{str}")]
        public async Task<ActionResult<List<Menu>>> GetSearchAsync(string str)
        {
            var result = await _db.Menu.FromSqlRaw("SELECT * FROM dbo.Menu where emertimi like '"+ str+"%'").ToListAsync();
            return result;
        }


        [HttpPost]
        public JsonResult addMenu(Menu menu){
                _db.Menu.Add(menu);
                _db.SaveChanges();
                return new JsonResult("Menu-ja u shtua me sukses");
        }

        [HttpPut]
        public JsonResult updateMenu(Menu menu)
        {
            _db.Menu.Update(menu);
            _db.SaveChanges();

            return new JsonResult("Menu-ja u perditesua me sukses");
        }

        [HttpDelete("{id}")]
        public JsonResult deleteMenu(int id)
        {
           var menu = _db.Menu.Find(id);
           _db.Remove(menu);
           _db.SaveChanges();

            return new JsonResult("Menu-ja u fshi me sukses");
        }
    }
}
