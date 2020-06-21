using System.Collections.Generic;

namespace TheMovieList.Models
{
    public class Comment
    {
        public long Id { get; set; }
        public string Message { get; set; }
        public Movie Movie { get; set; }
        public User Author { get; set; }
        List<User> ThumbsUp { get; set; }
        List<User> ThumbsDown { get; set; }

    }
}
