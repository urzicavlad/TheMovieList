using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TheMovieList.Models;

namespace TheMovieList.Contexts
{
    public class MoviesDbContext : IdentityDbContext
    {

        public MoviesDbContext(DbContextOptions<MoviesDbContext> options)
            : base(options)
        { }

    public DbSet<Movie> Movies { get; set; }

    public DbSet<Genre> Genres { get; set; }

    public DbSet<Comment> Comments { get; set; }

    public DbSet<MovieActor> MovieActors { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Movie>().HasKey(movie => movie.Id);
            modelBuilder.Entity<Actor>().HasKey(actor => actor.Id);
            modelBuilder.Entity<MovieActor>().HasKey(movieActor => movieActor.Id);
            
            modelBuilder.Entity<MovieActor>()
                .HasOne(actor => actor.Movie)
                .WithMany(movies => movies.Actors)
                .HasForeignKey(movieActor => movieActor.MovieId);

            modelBuilder.Entity<MovieActor>()
                .HasOne(movie => movie.Actor)
                .WithMany(actor => actor.Movies)
                .HasForeignKey(movieActor => movieActor.ActorId);
        }

    }
}
