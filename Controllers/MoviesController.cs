using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TheMovieList.Models;
using TheMovieList.Contexts;
using TheMovieList.ModelViews;
using TheMovieList.Mappers;
using Microsoft.EntityFrameworkCore;

namespace TheMovieList.Controllers

{
    [ApiController]
    [Produces("application/json")]
    [Route("[controller]")]
    public class MoviesController : ControllerBase
    {
     
        private readonly MoviesDbContext _context;

        public MoviesController(MoviesDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
        {
            var result = _context.Movies as IQueryable<Movie>;
            var movies = await result.ToListAsync();
            return Ok(movies);
        }

        [HttpGet("{movieId}")]
        public async Task<ActionResult<IEnumerable<MovieResponse>>> GetMovie(long movieId)
        {
            var movie = await _context.Movies
                                    .Where(movie => movie.Id == movieId)
                                    .Include(movie => movie.Genres)
                                    .FirstOrDefaultAsync();
            if (movie == null)
            {
                return NotFound();
            }
            var movieActors = await _context.MovieActors
                .Where(movieActor => movieActor.MovieId == movieId)
                .Include(movie => movie.Movie)
                .Include(actor => actor.Actor)
                .ToListAsync();
            movie.Actors = movieActors; 
            var comments = await _context.Comments
                                    .Where(comment => comment.Movie.Id == movieId)
                                    .Include(comment => comment.Movie)
                                    .ToListAsync();
            movie.Comments = comments;                   
            return Ok(MovieMapper.mapFromMovieToMovieResponse(movie));
        }

        [HttpGet("genres")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetGenres()
        {
            var result = _context.Genres as IQueryable<Genre>;
            var genres = await result.ToListAsync();
            return Ok(genres);
        }

        [HttpPost("genres")]
        public async Task<ActionResult<IEnumerable<Movie>>> PostGenre(Genre genre)
        {
            var result = _context.Genres.Add(genre);
            await _context.SaveChangesAsync();
            return Ok(genre);
        }

        [HttpPost]
        public async Task<ActionResult<AddMovieResponse>> PostMovie(AddMovieRequest addMovieRequest){
            Movie movie = MovieMapper.mapFormAddMovieRequestToMovie(addMovieRequest);
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();
            return Ok(MovieMapper.mapFromMovieToAddMovieResponse(movie));
        }


        [HttpGet("{movieId}/comments")]
        public async Task<ActionResult<IEnumerable<CommentResponse>>> GetComments(long movieId)
        {
            var comments = await _context.Comments
                                    .Where(comment => comment.Movie.Id == movieId)
                                    .Include(comment => comment.Movie)
                                    .ToListAsync();
            return Ok(CommentMapper.mapFormCommentToCommentResponse(comments));
        }

        [HttpPost("{movieId}/comments")]
        public async Task<ActionResult<AddCommentResponse>> PostComment(long movieId, AddCommentRequest commentRequest)
        {
            var movie = await _context.Movies.Include(movie => movie.Comments).FirstOrDefaultAsync(movie => movie.Id == movieId);
            var comment = CommentMapper.mapFormAddCommentRequestToComment(commentRequest);
            movie.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return Ok(CommentMapper.mapFromCommentToAddCommentResponse(comment));
        }

        [HttpPost("{movieId}/actors")]
        public async Task<ActionResult<MovieResponse>> PostActor(long movieId, AddActorRequest addActorRequest)
        {
            var movie = await _context.Movies.Include(movie => movie.Comments).FirstOrDefaultAsync(movie => movie.Id == movieId);
            var actor = ActorMapper.mapFormAddActorRequestToActor(addActorRequest);
            MovieActor movieActor = new MovieActor();
            movieActor.Actor = actor;
            movieActor.ActorId = actor.Id;
            movieActor.Movie = movie;
            movieActor.MovieId = movie.Id;
            movie.Actors.Add(movieActor);
            actor.Movies.Add(movieActor);
            _context.MovieActors.Add(movieActor);
            await _context.SaveChangesAsync();
            return Ok(MovieMapper.mapFromMovieToMovieResponse(movie));
        }

         [HttpGet("{movieId}/actors")]
        public async Task<ActionResult<List<ActorResponse>>> GetActors(long movieId)
        {
            var movie = await _context.Movies
            .Include(movie => movie.Comments)
            .Include(movie => movie.Actors)
            .FirstOrDefaultAsync(movie => movie.Id == movieId);

           var movieActors = await _context.MovieActors
                .Where(movieActor => movieActor.MovieId == movieId)
                .Include(movie => movie.Movie)
                .Include(actor => actor.Actor)
                .ToListAsync();

            var actors = new List<Actor>();
            foreach (var movieActor in movieActors)
            {
                actors.Add(movieActor.Actor);
            }    
            
            return Ok(ActorMapper.mapFormActorToActorResponse(actors));
        }

    }
}
