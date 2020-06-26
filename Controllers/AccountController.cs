using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TheMovieList.Models.Account;
using TheMovieList.Models;
using TheMovieList.Contexts;
using System.Linq;

namespace TheMovieList.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;

        private readonly IConfiguration configuration;

        private MoviesDbContext _context;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration,
            MoviesDbContext _context
            )
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this._context = _context;
        }

        [HttpPost]
        public async Task<ActionResult> Register([FromBody] RegisterModel registerModel)
        {
            IdentityUser identityUser = new IdentityUser() { Email = registerModel.Email, UserName = registerModel.Username  };
            IdentityResult result = await userManager.CreateAsync(identityUser, registerModel.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.ToString());
            }

            IdentityUser identityUserToLogIn = await userManager.FindByEmailAsync(registerModel.Email);

            User user = new User();
            user.Username = registerModel.Username;
            user.Role = registerModel.Role;
            user.Avatar = registerModel.Avatar;
            _context.User.Add(user);
            _context.SaveChanges();

            await LoginUser(identityUserToLogIn, registerModel.Password, false);

            LoginModel login = new LoginModel();
            login.Email = registerModel.Email;
            login.Password = registerModel.Password;
            return await Login(login);
        }

        [HttpPost]
        public async Task<ActionResult> Login([FromBody] LoginModel loginModel)
        {
            IdentityUser identityUser = await userManager.FindByEmailAsync(loginModel.Email);
            Microsoft.AspNetCore.Identity.SignInResult result = await LoginUser(identityUser, loginModel.Password, true);
            if (!result.Succeeded)
            {
                if (result.IsLockedOut)
                {
                    return BadRequest("LockedOut");
                }
                return BadRequest("WrongUserOrPassword");
            }
            User user = _context.User.Where(user => user.Username == identityUser.UserName).FirstOrDefault();

            return Ok(GenerateToken(loginModel.Email, identityUser, user));
        }

        private async Task<Microsoft.AspNetCore.Identity.SignInResult> LoginUser(IdentityUser user, string password, bool lockout)
        {
            return await signInManager.CheckPasswordSignInAsync(user, password, lockout);
        }

        private async Task LogoutUser()
        {
            await signInManager.SignOutAsync();
            return;
        }

        private Token GenerateToken(string email, IdentityUser identityUser, User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, identityUser.Id.ToString())
            };

            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration.GetValue<string>("Authentication:Secret")));

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("Authentication:Issuer"),
                audience: configuration.GetValue<string>("Authentication:Issuer"),
                claims: claims,
                expires: DateTime.Now.AddDays(this.configuration.GetValue<int>("Authentication:ExpiryTimeInDays")),
                signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
            );

            return new Token()
            {
                Value = new JwtSecurityTokenHandler().WriteToken(token),
                Expiry = token.ValidTo,
                Email = email,
                User = user
            };
        }

    }
}