using Food_delivery_app_LabCouse1.Data;
using Food_delivery_app_LabCouse1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Food_delivery_app_LabCouse1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestFavoriteController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public RestFavoriteController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<RestFavorite>>> GetRestFavorite()
        {
            return await _db.RestFavorite.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<RestFavorite>>> GetFavsAsync(string id)
        {
            var favs = await _db.RestFavorite
                .Include("Restauranti")
                .Include("User")
            .Where(x => x.UserId.Equals(id)).ToListAsync();
            return favs;
        }


        /*   [HttpGet("{id}")]
           public async Task<ActionResult<RestFavorite>> GetRestFavorit(int id)
           {
               return await _db.RestFavorite.FindAsync(id);
           }
        */
        [HttpPost]
        public JsonResult addRestFavorit(RestFavorite restFavorite)
        {
            _db.RestFavorite.Add(restFavorite);
            _db.SaveChanges();
            return new JsonResult("Restauranti u shtua ne listen favorite");
        }

        [HttpPut]
        public JsonResult updateRestFavorit(RestFavorite restFavorite)
        {
            _db.RestFavorite.Update(restFavorite);
            _db.SaveChanges();

            return new JsonResult("Lista u perditesua me sukses");
        }

        [HttpDelete("{id}")]
        public JsonResult deleteRestFavorit(int id)
        {
            var rest = _db.RestFavorite.Find(id);
            _db.Remove(rest);
            _db.SaveChanges();

            return new JsonResult("Restauranti u largua nga lista favorite");
        }
    }
}