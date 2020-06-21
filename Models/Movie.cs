using System.Collections.Generic;

namespace TheMovieList.Models
{
    public class Movie
    {

        public long Id { get; set; }
        public string Title { get; set; }
        public string Duration { get; set; }
        public string ReleaseDate { get; set; }
        public string OriginalTitle { get; set; }
        public string StoryLine { get; set; }
        public string PosterUrl { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Genre> Genres { get; set; }
        public List<MovieActor> Actors { get; set; } = new List<MovieActor>();
        

    }
}
