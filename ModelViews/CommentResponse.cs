 using TheMovieList.Models;
 using System.Collections.Generic;
 
 namespace TheMovieList.ModelViews 

 
 {
    public class CommentResponse
    {
        public long Id { get; set; }
        public string Message { get; set; }
        public User Author { get; set; }
        public List<User> ThumbsUp { get; set; }
        public List<User> ThumbsDown { get; set; }
    }
    
 }
 