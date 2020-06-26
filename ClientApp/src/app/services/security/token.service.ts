import {Token} from './security.models';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {

  saveToken(token: Token) {
    console.log(`Saving token: ${token}`);
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): Token | null {
    return this.validate(JSON.parse(localStorage.getItem('token') as string));
  }

  validate(token: Token | null): Token | null {
    if (token) {
      if (new Date(token.expiry) > new Date()) {
        return token;
      }
    }
    return null;
  }

  deleteToken() {
    console.log('Deleting token from local storage!');
    localStorage.removeItem('token');
  }

}
