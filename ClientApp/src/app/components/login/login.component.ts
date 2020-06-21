import {Component} from '@angular/core';
import {LoginModel} from '../../services/security/security.models';
import {SecurityService} from '../../services/security/security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public login: LoginModel = <LoginModel>{};

  constructor(private securityService: SecurityService, private router: Router) {
  }

  loginUser() {
    this.securityService.login(this.login).subscribe(token => {
      this.router.navigate(['/movies']);
    });
  }

}
