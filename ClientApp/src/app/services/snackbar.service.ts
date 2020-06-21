import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface SnackbarData {
  message: string;
  action: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbarData: SnackbarData;

  constructor(private _snackBar: MatSnackBar) {
  }

  openSnackBar(snackbarData: SnackbarData) {
    this.snackbarData = snackbarData;
    this._snackBar.open(this.snackbarData.message, this.snackbarData.action, {
      duration: this.snackbarData.duration,
    });
  }

}
