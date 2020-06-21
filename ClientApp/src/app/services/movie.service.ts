import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {DialogData, DialogService} from './dialog.service';
import {SnackbarData, SnackbarService} from './snackbar.service';
import {Comment} from '../components/movie-comment/movie-comment.component';

export class Genre {
  id: number;
  name: string;
}

export class Movie {
  id: number;
  title: string;
  originalTitle: string;
  duration: string;
  storyline: string;
  genres: string[];
  ratings: string[];
  releaseDate: string;
  actors: string[];
  imdbRating: number;
  posterUrl: string;
  comments: Comment[];
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _http: HttpClient,
              @Inject('BASE_URL') private baseUrl: string,
              private dialogService: DialogService,
              private snackbarService: SnackbarService) {
  }

  loadMovies(): Observable<Movie[]> {
    // return this._http.get<Movie[]>(`${this.baseUrl}movies`);
    let movies: Movie[];
    movies = [
      {
        id: 1,
        title: 'Nyckeln till frihet',
        genres: [
          'Crime',
          'Drama'
        ],
        ratings: [],
        duration: 'PT142M',
        releaseDate: '1995-03-03',
        originalTitle: 'The Shawshank Redemption',
        storyline: '',
        actors: [
          'Tim Robbins',
          'Morgan Freeman',
          'Bob Gunton'
        ],
        imdbRating: 9.3,
        posterUrl: '',
        comments: []
      },
      {
        id: 2,
        title: 'Gudfadern',
        genres: [
          'Crime',
          'Drama'
        ],
        ratings: [],
        duration: 'PT175M',
        releaseDate: '1972-09-27',
        originalTitle: 'The Godfather',
        storyline: 'When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen.                Written by\nJ. S. Golden',
        actors: [
          'Marlon Brando',
          'Al Pacino',
          'James Caan'
        ],
        imdbRating: 9.2,
        posterUrl: '',
        comments: [{
          message: 'Hello world!',
          user: {
            username: 'urzicavlad',
            role: 'Admin',
            avatar: 'https://avatars0.githubusercontent.com/u/37276343?s=460&u=c522513053d6b54d9219a7493997a9ca9ce624a1&v=4'
          },
          thumbsUp: [],
          thumbsDown: [],
        },
          {
            message: 'Hello world!',
            user: {
              username: 'urzicavlad',
              role: 'Admin',
              avatar: 'https://avatars0.githubusercontent.com/u/37276343?s=460&u=c522513053d6b54d9219a7493997a9ca9ce624a1&v=4'
            },
            thumbsUp: [],
            thumbsDown: [],
          },
          {
            message: 'Hello world!',
            user: {
              username: 'urzicavlad',
              role: 'Admin',
              avatar: 'https://avatars0.githubusercontent.com/u/37276343?s=460&u=c522513053d6b54d9219a7493997a9ca9ce624a1&v=4'
            },
            thumbsUp: [],
            thumbsDown: [],
          }

        ]
      },
      {
        id: 3,
        title: 'Gudfadern del II',
        genres: [
          'Crime',
          'Drama'
        ],
        ratings: [],
        duration: 'PT202M',
        releaseDate: '1975-07-28',
        originalTitle: 'The Godfather: Part II',
        storyline: '',
        actors: [
          'Al Pacino',
          'Robert De Niro',
          'Robert Duvall'
        ],
        imdbRating: 9.0,
        posterUrl: '',
        comments: []
      }
    ];
    return of(movies);
  }

  getAvailableGenres(): Observable<Genre[]> {
    // return this._http.get<Genre[]>(`${this.baseUrl}movies/genres`);
    const genre = [
      {id: 1, name: 'Crime'},
      {id: 2, name: 'Drama'},
      {id: 3, name: 'Romance'},
      {id: 4, name: 'Thriller'},
      {id: 5, name: 'Action'},
    ];
    return of(genre);
  }

  save(refreshDataCallback: Function) {
    this.dialogService.openCreateDialog().subscribe(movieToBeSaved => {
      console.log('The dialog was closed');
      console.log(`Movie: ${movieToBeSaved} will be saved!`);
      if (movieToBeSaved) {
        this._http.post<Movie>(`${this.baseUrl}movies`, movieToBeSaved)
          .subscribe
          (
            () => {
              const snackBar = <SnackbarData>{message: 'Movie was successfully saved!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              refreshDataCallback();
            },
            () => {
              const snackBar = <SnackbarData>{message: 'Cannot save Movie - maybe it is our fault!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              refreshDataCallback();
            }
          );
      }
    });
  }

  edit(oldMovie: Movie, refreshDataCallback: Function) {
    // this.dialogService.openEditTaskDialog(oldMovie).subscribe(movieToBeEdited => {
    //   console.log('The dialog was closed');
    //   if (movieToBeEdited) {
    //     movieToBeEdited.id = oldMovie.id;
    //     console.log(movieToBeEdited);
    //     this._http.put<Movie>(`${this.baseUrl}movies/${oldMovie.id}`, movieToBeEdited)
    //       .subscribe
    //       (
    //         () => {
    //           const snackBar = <SnackbarData>{message: 'Task was successfully edited and saved!', action: 'Close', duration: 2000};
    //           this.snackbarService.openSnackBar(snackBar);
    //           refreshDataCallback();
    //         },
    //         () => {
    //           const snackBar = <SnackbarData>{message: 'Cannot save task - maybe it is our fault!', action: 'Close', duration: 2000};
    //           this.snackbarService.openSnackBar(snackBar);
    //           refreshDataCallback();
    //         }
    //       );
    //   }
    // });
  }

  delete(movie: Movie, refreshDataCallback: Function) {
    const dialogData: DialogData = <DialogData>{
      question: `Are you sure you want to delete the tasks with id '${movie.id}'?`,
      title: `Delete task ${movie.title}`,
      result: false
    };
    this.dialogService.openYesNoDialog(dialogData).subscribe(dialogDataResponse => {
      console.log('The dialog was closed');
      console.log(dialogDataResponse.result);
      if (dialogDataResponse.result) {
        this._http.delete(`${this.baseUrl}tasks/${movie.id}`)
          .subscribe
          (
            () => {
              const snackBar = <SnackbarData>{message: 'Task was successfully deleted!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              refreshDataCallback();
            },
            () => {
              const snackBar = <SnackbarData>{message: 'Cannot delete task - maybe it has comments?', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              refreshDataCallback();
            }
          );
      }
    });
  }

}
