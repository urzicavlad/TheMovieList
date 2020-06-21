import {Component} from '@angular/core';
import {SnackbarService} from '../../services/snackbar.service';
import {DialogService} from '../../services/dialog.service';
import {ToolbarEvent} from '../toolbar/toolbar.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private snackbarService: SnackbarService, private dialogService: DialogService) {
  }

  toggleSnackBar() {
    this.snackbarService.openSnackBar({message: 'I want cookieess!', duration: 3000, action: 'Close'});
  }

  toggleDialog() {
    this.dialogService.openYesNoDialog({title: 'Question 1', question: 'Agree or not?', result: false})
      .subscribe(result => console.log(result));
  }

  showEvent(toolbarEvent: ToolbarEvent) {
    console.log(toolbarEvent);
  }

}
