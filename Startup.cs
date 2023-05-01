using Food_delivery_app_LabCouse1.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Serialization;
using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Food_delivery_app_LabCouse1.Models;
using Newtonsoft.Json;
using Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;

namespace Food_delivery_app_LabCouse1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Link JwtConfig class with secret string for token added in appsetting.json file
            services.Configure<JwtConfig>(Configuration.GetSection("JwtConfig"));

            //Enable CORS
            services.AddCors(opt =>
            {   
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000").AllowCredentials();
                });
            });

            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
               Configuration.GetConnectionString("DBConnection")
            ));

            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
               Configuration.GetConnectionString("DefaultConnection")
            ));

            var key = Encoding.ASCII.GetBytes(Configuration["JwtConfig:Secret"]);

            var tokenValidationParams = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                //Qitu duhet mu bo true per me expire ni token per 6 ore qe e kena lan te controlleri
                RequireExpirationTime = false,
                
                // Allow to use seconds for expiration of token
                // Required only when token lifetime less than 5 minutes
                // THIS ONE
                ClockSkew = TimeSpan.Zero
            };

            services.AddSingleton(tokenValidationParams);

           services.AddAuthentication(options=> {
               options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
               //nese e para fails, e perdorum te dyten
               options.DefaultScheme= JwtBearerDefaults.AuthenticationScheme;
               options.DefaultChallengeScheme=JwtBearerDefaults.AuthenticationScheme;
           })
           .AddJwtBearer(jwt => {
               jwt.SaveToken = true;
               jwt.TokenValidationParameters = tokenValidationParams;
           });

            services.AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddControllersWithViews();

            services.AddControllers().AddNewtonsoftJson();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
