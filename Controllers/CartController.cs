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
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public CartController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Cart>>> GetCarts()
        {
            return await _db.Cart.Include("Menu").ToListAsync();
        }

        /*[HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            return await _db.Cart.FindAsync(id);
        }*/

        //get cart items by user id
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Cart>>> GetCartAsync(string id)
        {
            var cart = await _db.Cart
                .Include("Menu")
                .Include("User")
            .Where(x => x.UserId.Equals(id)).ToListAsync();
            return cart;
        }


        [HttpPost]
        public JsonResult addCart(Cart cart)
        {
            _db.Cart.Add(cart);
            _db.SaveChanges();
            return new JsonResult("Menu u shtua ne shporte!");
        }

        [HttpPut]
        public JsonResult updateCart(Cart cart)
        {
            _db.Cart.Update(cart);
            _db.SaveChanges();

            return new JsonResult("Cart u perditesua me sukses");
        }

        [HttpDelete("{id}")]
        public JsonResult deleteCart(int id)
        {
            var cart = _db.Cart.Find(id);
            _db.Remove(cart);
            _db.SaveChanges();

            return new JsonResult("Cart u fshi me sukses");
        }
    }
}