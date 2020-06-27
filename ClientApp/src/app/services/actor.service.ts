import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActorApiService} from './api/actor.api.service';
import {SnackbarData, SnackbarService} from './snackbar.service';
import {DialogData, DialogService} from './dialog.service';

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

  delete(actor: Actor) {
    const dialogData: DialogData = <DialogData>{
      question: `Are you sure you want to delete the actor with id '${actor.id}'?`,
      title: `Delete actor ${actor.name}`,
      result: false
    };
    this.dialogService.openYesNoDialog(dialogData).subscribe(dialogDataResponse => {
      console.log('The dialog was closed');
      console.log(dialogDataResponse.result);
      if (dialogDataResponse.result) {
        this.actorApiService.delete(actor.id).subscribe
        (
          () => {
            const snackBar = <SnackbarData>{message: 'Actor was successfully deleted!', action: 'Close', duration: 2000};
            this.snackbarService.openSnackBar(snackBar);
          },
          () => {
            const snackBar = <SnackbarData>{message: 'Cannot delete actor - maybe it has comments?', action: 'Close', duration: 2000};
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
