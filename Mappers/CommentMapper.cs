using System.Collections.Generic;
using TheMovieList.Models;
using TheMovieList.ModelViews;

namespace TheMovieList.Mappers
{
    public class CommentMapper
    {

        public static AddCommentResponse mapFromCommentToAddCommentResponse(Comment comment) {
            AddCommentResponse result = new AddCommentResponse();
            result.Id = comment.Id;
            result.Message = comment.Message;
            return result;
        }

        public static Comment mapFormAddCommentRequestToComment(AddCommentRequest commentRequest) {
            Comment result = new Comment();
            result.Message = commentRequest.Message;
            return result;
        }

        public static CommentResponse mapFormCommentToCommentResponse(Comment comment) {
            CommentResponse result = new CommentResponse();
            result.Id = comment.Id;
            result.Message = comment.Message;
            return result;
        }

        public static List<CommentResponse> mapFormCommentToCommentResponse(List<Comment> comments) {
            List<CommentResponse> result = new List<CommentResponse>();
            foreach (var comment in comments)
            {
               result.Add(mapFormCommentToCommentResponse(comment));
            }
            return result;
        }


    }
}