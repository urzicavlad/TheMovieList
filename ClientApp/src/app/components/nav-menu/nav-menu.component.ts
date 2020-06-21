import {Component} from '@angular/core';
import {SecurityService} from '../../services/security/security.service';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(public securityService: SecurityService, public applicationService: ApplicationService) {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
