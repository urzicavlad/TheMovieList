import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  canActivate() {
    return true;
  }

}
