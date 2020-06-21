import {Token} from './security.models';


export class TokenService {

  saveToken(token: Token) {
    console.log(`Saving token: ${token}`);
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): Token | null {
    console.log('Getting token from local storage!');
    return this.validate(JSON.parse(localStorage.getItem('token') as string));
  }

  validate(token: Token | null): Token | null {
    console.log('Validating token from local storage!');
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
