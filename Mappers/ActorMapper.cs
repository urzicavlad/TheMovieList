using System.Collections.Generic;
using TheMovieList.Models;
using TheMovieList.ModelViews;

namespace TheMovieList.Mappers
{
    public class ActorMapper
    {

        public static Actor mapFormAddActorRequestToActor(AddActorRequest actorRequest) {
            Actor actor = new Actor();
            actor.Name = actorRequest.Name;
            return actor;
        }

         public static ActorResponse mapFormActorToActorResponse(Actor actor) {
            ActorResponse result = new ActorResponse();
            result.Id = actor.Id;
            result.Name = actor.Name;
            return result;
        }

        public static List<ActorResponse> mapFormActorToActorResponse(List<Actor> actors) {
            List<ActorResponse> result = new List<ActorResponse>();
            foreach (var actor in actors)
            {
                result.Add(mapFormActorToActorResponse(actor));
            }
            return result;
        }

    }
}