using System.Collections.Generic;

namespace TheMovieList.Models
{
    public class Actor
    {
        public long Id { get; set; }
        
        public string Name { get; set; }

        public List<MovieActor> Movies { get; set; } = new List<MovieActor>();

    }
}
