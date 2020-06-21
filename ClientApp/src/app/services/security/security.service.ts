import {Observable, Observer} from 'rxjs';
import {LoginModel, RegisterModel, Token} from './security.models';
import {ApplicationService} from '../application.service';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class SecurityService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private applicationService: ApplicationService) {
  }

  register(registerModel: RegisterModel) {
    console.log(`New user ${registerModel.email} will be registered!`);
    return new Observable<Token>((obs: Observer<Token>) => {
      this.httpClient.post<Token>(`${this.applicationService.baseUrl}Account/Register`, registerModel).subscribe(token => {
        this.tokenService.saveToken(token);
        obs.next(token);
        obs.complete();
      });
    });
  }

  login(loginModel: LoginModel): Observable<Token> {
    console.log(`User ${loginModel.email} will be logged in!`);
    return new Observable<Token>((obs: Observer<Token>) => {
      this.httpClient.post<Token>(`${this.applicationService.baseUrl}Account/Login`, loginModel).subscribe(token => {
        this.tokenService.saveToken(token);
        obs.next(token);
        obs.complete();
      });
    });
  }

  logout() {
    console.log(`Log out was called!`);
    this.tokenService.deleteToken();
  }
}
