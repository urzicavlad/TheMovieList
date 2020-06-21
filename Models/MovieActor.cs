using System.Collections.Generic;

namespace TheMovieList.Models
{
    public class MovieActor
    {

        public long Id { get; set; }
        
        public long ActorId { get; set; }

        public Actor Actor { get; set; }

        public long MovieId { get; set; }
        
        public Movie Movie { get; set; }

    }
}
