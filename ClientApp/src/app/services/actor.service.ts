import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActorApiService} from './api/actor.api.service';
import {SnackbarData, SnackbarService} from './snackbar.service';
import {DialogService} from './dialog.service';

export class Actor {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  refreshEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(private actorApiService: ActorApiService,
              private dialogService: DialogService,
              private snackbarService: SnackbarService) {
  }

  loadActors(): Observable<Actor[]> {
    return this.actorApiService.loadActors();
  }

  getRefreshEmitter() {
    return this.refreshEmitter;
  }

  save() {
    this.dialogService.openCreateActorDialog().subscribe((actorToBeSaved) => {
      console.log('The dialog was closed');
      console.log(`Actor: ${actorToBeSaved} will be saved!`);
      if (actorToBeSaved) {
        this.actorApiService.save(actorToBeSaved)
          .subscribe
          (
            () => {
              const snackBar = <SnackbarData>{message: 'Actor was successfully saved!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
            },
            () => {
              const snackBar = <SnackbarData>{message: 'Cannot save Actor - maybe it is our fault!', action: 'Close', duration: 2000};
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
