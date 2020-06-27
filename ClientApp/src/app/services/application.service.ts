import {TokenService} from './security/token.service';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class ApplicationService {


  constructor(@Inject('BASE_URL') public baseUrl: string,
              private tokenService: TokenService) {
  }

  isLoggedIn() {
    return this.tokenService.getToken() != null;
  }

  isAdmin() {
    return this.tokenService.getToken().user.role === 'ADMIN';
  }

  userEmail() {
    const token = this.tokenService.getToken();

    if (token != null) {
      return token.email;
    }

    return '';
  }
}
