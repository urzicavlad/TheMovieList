import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {YesNoDialogComponent} from '../components/yes-no-dialog/yes-no-dialog.component';
import {CreateMovieModalComponent} from '../components/create-movie-modal/create-movie-modal.component';
import {Movie} from './movie.service';


export interface DialogData {
  title: string;
  question: string;
  result: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {


  constructor(public dialog: MatDialog) {
  }

  openYesNoDialog(dialogData: DialogData): Observable<DialogData> {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '450px',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }
  openCreateDialog(): Observable<Movie> {
    const dialogRef = this.dialog.open(CreateMovieModalComponent, {
      width: '600px',
      height: '600px'
    });
    return dialogRef.afterClosed();
  }
}

