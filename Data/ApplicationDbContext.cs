using Food_delivery_app_LabCouse1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Food_delivery_app_LabCouse1.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            /*builder.Entity<CartMenu>().HasKey(x => new { x.MenuID, x.CartID });
            builder.Entity<CartMenu>()
                .HasOne(pt => pt.Menu)
                .WithMany(p => p.CartMenus)
                .HasForeignKey(pt => pt.MenuID);

            builder.Entity<CartMenu>()
                .HasOne(pt => pt.Cart)
                .WithMany(t => t.CartMenus)
                .HasForeignKey(pt => pt.CartID);*/
        }
        public DbSet<Restauranti> Restauranti { get; set; }
        public DbSet<Qyteti> Qyteti { get; set; }
        public DbSet<Porosia> Porosia { get; set; }
        public DbSet<ContactUs> ContactUs { get; set; }
        public DbSet<Menu> Menu { get; set; }
       // public DbSet<CartItem> Cart { get; set; } 
        public DbSet<Ushqimi> Ushqimi { get; set; }
       // public DbSet<CartMenu> CartItemMenu { get; set; } 
        public DbSet<Pija> Pija { get; set; }
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
        public virtual DbSet<Cart> Cart { get; set; }
        public virtual DbSet<Telefoni> Telefoni { get; set; }
        public virtual DbSet<RestFavorite> RestFavorite { get; set; }
        public virtual DbSet<Vleresimet> Vleresimet { get; set; }
    }
}
