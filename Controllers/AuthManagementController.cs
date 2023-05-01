using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Configuration;
using Food_delivery_app_LabCouse1.Configuration;
using Food_delivery_app_LabCouse1.Data;
using Food_delivery_app_LabCouse1.Models;
using Food_delivery_app_LabCouse1.Models.DTOs.Requests;
using Food_delivery_app_LabCouse1.Models.DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using static Microsoft.AspNetCore.Http.IRequestCookieCollection;

namespace Food_delivery_app_LabCouse1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthManagementController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        private readonly JwtConfig _jwtConfig;

        private readonly TokenValidationParameters _tokenValidationParams;

        private readonly ApplicationDbContext _applicationDbContext;

        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly ILogger<AuthManagementController> _logger;

        public AuthManagementController(
            UserManager<IdentityUser> userManager,
            IOptionsMonitor<JwtConfig> optionsMonitor,
            RoleManager<IdentityRole> roleManager,
            ILogger<AuthManagementController> logger,
            TokenValidationParameters tokenValidationParams,
            ApplicationDbContext dbContext
        )
        {
            _userManager = userManager;

            //e mer vleren aktuale te appsettings edhe e inject ne controller
            _jwtConfig = optionsMonitor.CurrentValue;
            //ka qit error per shkak te emertimit
            _tokenValidationParams = tokenValidationParams;
            _roleManager = roleManager;
            _logger = logger;
            _applicationDbContext = dbContext;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult>
        Register([FromBody] UserRegistrationDTO user)
        {
            if (ModelState.IsValid)
            {
                //mundemi me perdor modelin veq nese esht valid
                var existingUser =
                    await _userManager.FindByEmailAsync(user.Email);

                if (existingUser != null)
                {
                    return BadRequest(new RegsitrationResponse()
                    {
                        Errors = new List<string>() { "Perdoruesi ekziston!" },
                        Success = false
                    });
                }

                var newUser =
                    new IdentityUser()
                    { Email = user.Email, UserName = user.Username };
                var isCreated =
                    await _userManager.CreateAsync(newUser, user.Password);
                if (isCreated.Succeeded)
                {
                    //caktimi i rolit kur nje perdorues regjistrohet ne sistem
                    await _userManager.AddToRoleAsync(newUser, user.Roli);

                    var jwtToken = await GenerateJwtTokenAsync(newUser);

                    return Ok(jwtToken);
                }
                else
                {
                    return BadRequest(new RegsitrationResponse()
                    {
                        Errors =
                            isCreated
                                .Errors
                                .Select(x => x.Description)
                                .ToList(),
                        Success = false
                    });
                }
            }

            //nese sesht valid at her esht bad request
            return BadRequest(new RegsitrationResponse()
            {
                Errors =
                    new List<string>()
                    { "Invalid payload(Nuk jane dhene te gjithe parametrat)" },
                Success = false
            });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest user)
        {
            if (ModelState.IsValid)
            {
                var existingUser =
                    await _userManager.FindByEmailAsync(user.Email);

                if (existingUser == null)
                {
                    return BadRequest(new RegsitrationResponse()
                    {
                        Errors =
                            new List<string>()
                            {
                                "Invalid login request(Perdoruesi nuk ekziston, ose te dhenat jane gabim)"
                            },
                        Success = false
                    });
                }

                var isCorrect =
                    await _userManager
                        .CheckPasswordAsync(existingUser, user.Password);

                if (!isCorrect)
                {
                    return BadRequest(new RegsitrationResponse()
                    {
                        Errors =
                            new List<string>()
                            {
                                "Invalid login request(Perdoruesi nuk ekziston, ose te dhenat jane gabim)"
                            },
                        Success = false
                    });
                }

                var jwtToken = await GenerateJwtTokenAsync(existingUser);

                return Ok(jwtToken);
            }

            return BadRequest(new RegsitrationResponse()
            {
                Errors =
                    new List<string>() { "Te dhenat jane te pa vlefshme!" },
                Success = false
            });
        }

        [HttpPost]
        [Route("RefreshToken")]
        public async Task<IActionResult>
        RefreshToken()
        {
            TokenRequest tokenRequest = new TokenRequest(){
                Token = Request.Cookies["jwt"],
                RefreshToken = Request.Cookies["jwtRefresh"]
            };
            
            if (ModelState.IsValid)
            {
                var result = await VerifyToken(tokenRequest);
                if (result == null)
                {
                    return BadRequest(new RegsitrationResponse()
                    {
                        Errors = new List<string>() { "Invalid tokens" },
                        Success = false
                    });
                }
                return Ok(result);
            }
            return BadRequest(new RegsitrationResponse()
            {
                Errors = new List<string>() { "Invalid payload" },
                Success = false
            });
        }

        private async Task<AuthResult> GenerateJwtTokenAsync(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);

            //var claims = await GetAllValidClaims(user);
            var tokenDescriptor =
                new SecurityTokenDescriptor {
                    Subject =
                        new ClaimsIdentity(new []
                            {
                                new Claim("Id", user.Id),
                                new Claim(JwtRegisteredClaimNames.Email,
                                    user.Email),
                                new Claim(JwtRegisteredClaimNames.Sub,
                                    user.Email),
                                new Claim(JwtRegisteredClaimNames.Jti,
                                    Guid.NewGuid().ToString())
                            }),
                    //Ni tokeni i del afati 5 minuta pas regjistrimit
                    Expires = DateTime.UtcNow.AddSeconds(10),
                    SigningCredentials =
                        new SigningCredentials(new SymmetricSecurityKey(key),
                            SecurityAlgorithms.HmacSha256Signature)
                };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            var refreshToken =
                new RefreshToken()
                {
                    JwtId = token.Id,
                    IsUsed = false,
                    IsRevoked = false,
                    UserId = user.Id,
                    AddedDated = DateTime.UtcNow,
                    ExpiryDate = DateTime.UtcNow.AddDays(1),
                    Token = RandomString(35) + Guid.NewGuid()
                };
            var existingUser = await _userManager.FindByEmailAsync(user.Email);
            var roles = await _userManager.GetRolesAsync(existingUser);

            await _applicationDbContext.RefreshTokens.AddAsync(refreshToken);
            await _applicationDbContext.SaveChangesAsync();

            Response
                    .Cookies
                    .Append("jwt",
                    jwtToken,
                    new CookieOptions { HttpOnly = true });
                
                Response
                    .Cookies
                    .Append("jwtRefresh",
                    refreshToken.Token,
                    new CookieOptions { HttpOnly = true });
                    
            return new AuthResult()
            {
                Token = jwtToken,
                Success = true,
                RefreshToken = refreshToken.Token,
                User = existingUser,
                Roles = roles
            };
        }

        private string RandomString(int length)
        {
            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable
                    .Repeat(chars, length)
                    .Select(x => x[random.Next(x.Length)])
                    .ToArray());
        }

        private async Task<List<Claim>> GetAllValidClaims(IdentityUser user)
        {
            var claims =
                new List<Claim> {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti,
                        Guid.NewGuid().ToString())
                };

            // Getting the claims that we have assigned to the user
            var userClaims = await _userManager.GetClaimsAsync(user);
            claims.AddRange (userClaims);

            // Get the user role and add it to the claims
            var userRoles = await _userManager.GetRolesAsync(user);

            foreach (var userRole in userRoles)
            {
                var role = await _roleManager.FindByNameAsync(userRole);

                if (role != null)
                {
                    claims.Add(new Claim(ClaimTypes.Role, userRole));

                    var roleClaims = await _roleManager.GetClaimsAsync(role);
                    foreach (var roleClaim in roleClaims)
                    {
                        claims.Add (roleClaim);
                    }
                }
            }

            return claims;
        }

        /*
            var handler = new JwtSecurityTokenHandler();
            var restoken = handler.ReadJwtToken(jwt);
        */
        [HttpGet("user")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = Verify(jwt);

                string userEmail = token.Subject;

                var user = await _userManager.FindByEmailAsync(userEmail);

                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

         
         private async Task<AuthResult> VerifyToken(TokenRequest tokenRequest)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            try
            {   
                // Validation 1 - Validation JWT token format
                _tokenValidationParams.ValidateLifetime = false;
                var tokenInVerification = jwtTokenHandler.ValidateToken(tokenRequest.Token, _tokenValidationParams, out var validatedToken);
                _tokenValidationParams.ValidateLifetime = true;

                // Validation 2 - Validate encryption alg
                if(validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

                    if(result == false) {
                        return null;
                    }
                }

                // Validation 3 - validate expiry date
                var utcExpiryDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

                var expiryDate = UnixTimeStampToDateTime(utcExpiryDate);

                var storedToken = await _applicationDbContext.RefreshTokens.FirstOrDefaultAsync(x => x.Token == tokenRequest.RefreshToken);
                var dbUser = await _userManager.FindByIdAsync(storedToken.UserId);
                var roles = await _userManager.GetRolesAsync(dbUser);
                
                if(expiryDate > DateTime.UtcNow) {
                    return new AuthResult() {
                        Token = tokenRequest.Token,
                        RefreshToken = tokenRequest.RefreshToken,
                        Roles = roles
                    };
                }

                // validation 4 - validate existence of the token
                

                if(storedToken == null)
                {
                    return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Token does not exist"
                        }
                    };
                }

                // Validation 5 - validate if used
                if(storedToken.IsUsed)
                {
                    return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Token has been used"
                        }
                    };
                }

                // Validation 6 - validate if revoked
                if(storedToken.IsRevoked)
                {
                    return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Token has been revoked"
                        }
                    };
                }

                // Validation 7 - validate the id
                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

                if(storedToken.JwtId != jti)
                {
                    return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Token doesn't match"
                        }
                    };
                }
                
                // Validation 8 - validate stored token expiry date
                if (storedToken.ExpiryDate < DateTime.UtcNow)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>() {
                            "Refresh token has expired"
                        }
                    };
                }

                // update current token 

                storedToken.IsUsed = true;
                _applicationDbContext.RefreshTokens.Update(storedToken);
                await _applicationDbContext.SaveChangesAsync();
                
                // Generate a new token
                return await GenerateJwtTokenAsync(dbUser);
            }
            catch(Exception ex)
            {
                if(ex.Message.Contains("Lifetime validation failed. The token is expired.")) {

                      return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Token has expired please re-login"
                        }
                    };
                
                } else {
                      return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Something went wrong."
                        }
                    };
                }
            }    
        }

        private DateTime UnixTimeStampToDateTime(long unixTimeStamp)
        {
            var dateTimeVal =
                new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTimeVal =
                dateTimeVal.AddSeconds(unixTimeStamp).ToUniversalTime();

            return dateTimeVal;
        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);
            tokenHandler
                .ValidateToken(jwt,
                new TokenValidationParameters {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false
                },
                out SecurityToken validatedToken);

            return (JwtSecurityToken) validatedToken;
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(key: "jwt");
            Response.Cookies.Delete(key: "jwtRefresh");
            return Ok(new { message = "success" });
        }
    }
}
