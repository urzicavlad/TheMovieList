using System.Collections.Generic;
using TheMovieList.Models;
using TheMovieList.ModelViews;
using TheMovieList.Mappers;
using System;
using TheMovieList.Models;

namespace TheMovieList.Mappers
{
    public class MovieMapper
    {

        public static AddMovieResponse mapFromMovieToAddMovieResponse(Movie movie) {
            AddMovieResponse result = new AddMovieResponse();
            result.Id = movie.Id;
            result.Title = movie.Title;
            result.Duration = movie.Duration;
            result.ReleaseDate = movie.ReleaseDate;
            result.OriginalTitle = movie.OriginalTitle;
            result.StoryLine = movie.StoryLine;
            result.PosterUrl = movie.PosterUrl;
            result.Genres = movie.Genres;
            return result;
        }

         public static MovieResponse mapFromMovieToMovieResponse(Movie movie) {
            MovieResponse result = new MovieResponse();
            result.Id = movie.Id;
            result.Title = movie.Title;
            result.Duration = movie.Duration;
            result.ReleaseDate = movie.ReleaseDate;
            result.OriginalTitle = movie.OriginalTitle;
            result.StoryLine = movie.StoryLine;
            result.PosterUrl = movie.PosterUrl;
            result.Genres = movie.Genres;
            result.Comments = CommentMapper.mapFormCommentToCommentResponse(movie.Comments);
            
            foreach (var movieActor in movie.Actors)
            {
                result.Actors.Add(ActorMapper.mapFormActorToActorResponse(movieActor.Actor));
                
            }
            return result;
        }

        public static Movie mapFormAddMovieRequestToMovie(AddMovieRequest movieRequest) {
            Movie result = new Movie();
            result.Title = movieRequest.Title;
            result.Duration = movieRequest.Duration;
            result.ReleaseDate = movieRequest.ReleaseDate;
            result.OriginalTitle = movieRequest.OriginalTitle;
            result.StoryLine = movieRequest.StoryLine;
            result.PosterUrl = movieRequest.PosterUrl;
         
            foreach (var genreAsString in movieRequest.Genres)
            {
                GenreType genreType = (GenreType)Enum.Parse(typeof(GenreType), genreAsString);
                Genre genre = new Genre();
                genre.GenreType = genreType;
                result.Genres.Add(genre);
            }
            return result;
        }
    }
}