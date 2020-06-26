using TheMovieList.Models;

namespace TheMovieList.ModelViews


{
    public class AddCommentRequest
    {
        public string Message { get; set; }

        public long UserId { get; set; }

        public User Author { get; set; }
    }
}
