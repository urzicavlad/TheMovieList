using TheMovieList.Models;
using System.Collections.Generic;

 namespace TheMovieList.ModelViews 
 
 {
    public class AddMovieRequest
    {
        public string Title { get; set; }
        public string Duration { get; set; }
        public string ReleaseDate { get; set; }
        public string OriginalTitle { get; set; }
        public string StoryLine { get; set; }
        public string PosterUrl { get; set; }
        public List<Genre> Genres { get; set; }
    }

 }
 