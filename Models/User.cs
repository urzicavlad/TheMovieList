using System.Collections.Generic;

namespace TheMovieList.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public string Avatar { get; set; }

        public List<Comment> Comments;

    }
}
