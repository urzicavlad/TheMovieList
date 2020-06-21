using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace TheMovieList.Contexts
{
    public class MoviesDbContext : IdentityDbContext
    {

        public MoviesDbContext(DbContextOptions<MoviesDbContext> options)
            : base(options)
        { }
    }
}
