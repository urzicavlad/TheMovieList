import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../movie.service';
import {Actor} from '../actor.service';
import {Comment} from '../../components/movie-comment/movie-comment.component';

@Injectable({providedIn: 'root'})
export class MovieApiService {
  private _http: HttpClient;

  constructor(_http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this._http = _http;
  }

  loadMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(`${this.baseUrl}movies`);
  }

  getMovie(id: number): Observable<Movie> {
    return this._http.get<Movie>(`${this.baseUrl}movies/${id}`);
  }

  getMovieComments(id: number): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this.baseUrl}movies/${id}/comments`);
  }

  getAvailableGenres(): Observable<string[]> {
    return this._http.get<string[]>(`${this.baseUrl}movies/genres`);
  }

  save(movie: Movie): Observable<Movie> {
    return this._http.post<Movie>(`${this.baseUrl}movies`, movie);
  }

  delete(movieId: number) {
    return this._http.delete(`${this.baseUrl}movies/${movieId}`);
  }

  addActor(movieId: number, actor: Actor) {
    return this._http.post<Movie>(`${this.baseUrl}movies/${movieId}/actors`, actor);
  }

  addComment(movieId: number, comment: Comment) {
    return this._http.post<Comment>(`${this.baseUrl}movies/${movieId}/comments`, comment);
  }

  update(movieToBeEdited: any): Observable<Movie> {
    return null;
  }
}
