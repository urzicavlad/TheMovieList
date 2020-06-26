import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DialogData, DialogService} from './dialog.service';
import {SnackbarData, SnackbarService} from './snackbar.service';
import {Comment} from '../components/movie-comment/movie-comment.component';
import {MovieApiService} from './api/movie.api.service';
import {Actor} from './actor.service';


export class Genre {
  id: number;
  genreType: string;
}

export class Movie {
  id: number;
  title: string;
  originalTitle: string;
  duration: string;
  storyLine: string;
  genres: Genre[];
  releaseDate: string;
  actors: Actor[];
  posterUrl: string;
  comments: Comment[];
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  refreshEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(private movieApiService: MovieApiService,
              private dialogService: DialogService,
              private snackbarService: SnackbarService) {
  }

  loadMovies(): Observable<Movie[]> {
    return this.movieApiService.loadMovies();
  }

  getRefreshEmitter() {
    return this.refreshEmitter;
  }

  save() {
    this.dialogService.openCreateMovieDialog().subscribe(movieToBeSaved => {
      console.log('The dialog was closed');
      console.log(`Movie: ${movieToBeSaved} will be saved!`);
      if (movieToBeSaved) {
        this.movieApiService.save(movieToBeSaved)
          .subscribe
          (
            (savedMovie) => {
              const snackBar = <SnackbarData>{message: 'Movie was successfully saved!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              movieToBeSaved.actors.forEach(actor => {
                this.movieApiService.addActor(savedMovie.id, actor);
              });
            },
            () => {
              const snackBar = <SnackbarData>{message: 'Cannot save Movie - maybe it is our fault!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
            },
            () => {
              this.refreshEmitter.emit();
            }
          );
      }
    });
  }

  edit(oldMovie: Movie) {
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

  delete(movie: Movie) {
    const dialogData: DialogData = <DialogData>{
      question: `Are you sure you want to delete the tasks with id '${movie.id}'?`,
      title: `Delete task ${movie.title}`,
      result: false
    };
    this.dialogService.openYesNoDialog(dialogData).subscribe(dialogDataResponse => {
      console.log('The dialog was closed');
      console.log(dialogDataResponse.result);
      if (dialogDataResponse.result) {
        this.movieApiService.delete(movie.id).subscribe
        (
          () => {
            const snackBar = <SnackbarData>{message: 'Task was successfully deleted!', action: 'Close', duration: 2000};
            this.snackbarService.openSnackBar(snackBar);
          },
          () => {
            const snackBar = <SnackbarData>{message: 'Cannot delete task - maybe it has comments?', action: 'Close', duration: 2000};
            this.snackbarService.openSnackBar(snackBar);
          },
          () => {
            this.refreshEmitter.emit();
          }
        );
      }
    });
  }

}
