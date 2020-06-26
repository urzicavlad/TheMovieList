using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheMovieList.Contexts;
using TheMovieList.Mappers;
using TheMovieList.Models;
using TheMovieList.ModelViews;

namespace ToDoApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly MoviesDbContext _context;

        public ActorsController(MoviesDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Actor>>> getActors()
        {
            var actors = await _context.Actor.ToListAsync();
            return Ok(actors);
        }

        [HttpPost]
        public async Task<ActionResult<ActorResponse>> PostComment(long movieId, AddActorRequest addActorRequest)
        {
            Actor actor = ActorMapper.mapFormAddActorRequestToActor(addActorRequest);
            _context.Actor.Add(actor);
            await _context.SaveChangesAsync();
            return Ok(ActorMapper.mapFormActorToActorResponse(actor));
        }
    }
}
