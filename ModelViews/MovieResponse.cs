using TheMovieList.Models;
using System.Collections.Generic;

 namespace TheMovieList.ModelViews 
 
 {
    public class MovieResponse
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Duration { get; set; }
        public string ReleaseDate { get; set; }
        public string OriginalTitle { get; set; }
        public string StoryLine { get; set; }
        public string PosterUrl { get; set; }
        public List<Genre> Genres { get; set; } = new List<Genre>();
        public List<ActorResponse> Actors { get; set; } = new List<ActorResponse>();
        public List<CommentResponse> Comments { get; set; }
    }
    
 }
 