import {Component} from '@angular/core';
import {RegisterModel} from '../../services/security/security.models';
import {SecurityService} from '../../services/security/security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  public register: RegisterModel = <RegisterModel>{};

  constructor(private securityService: SecurityService, private router: Router) {
  }

  registerUser() {
    this.securityService.register(this.register).subscribe(token => {
      this.router.navigate(['/movies']);
    });
  }

}
