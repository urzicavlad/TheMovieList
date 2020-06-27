import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TokenService} from '../../services/security/token.service';
import {ApplicationService} from '../../services/application.service';


export enum ToolbarEvent {
  MORE = 1,
  EDIT = 2,
  DELETE = 3,
  CREATE = 4,
  TOGGLE_DASHBOARD = 5,
}


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class ToolbarComponent {

  @Input() numberOfItems: number;
  @Input() activeToolbar;
  @Input() toolbarTitle = 'Toolbar';
  @Output() toolbarEvent: EventEmitter<ToolbarEvent> = new EventEmitter<ToolbarEvent>();

  constructor(public applicationService: ApplicationService) {
  }


  onDelete() {
    console.log('Delete view!');
    this.toolbarEvent.emit(ToolbarEvent.DELETE);
  }

  onCreate() {
    console.log('Create view!');
    this.toolbarEvent.emit(ToolbarEvent.CREATE);
  }

  onEdit() {
    console.log('Edit view!');
    this.toolbarEvent.emit(ToolbarEvent.EDIT);
  }

  onMore() {
    console.log('More view!');
    this.toolbarEvent.emit(ToolbarEvent.MORE);
  }

  onDashboard() {
    console.log('Dashboard view!');
    this.toolbarEvent.emit(ToolbarEvent.TOGGLE_DASHBOARD);
  }

}
