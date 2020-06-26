import {NgModule} from '@angular/core';
import {TokenService} from '../services/security/token.service';
import {ApplicationService} from '../services/application.service';
import {SecurityService} from '../services/security/security.service';
import {HttpRequestInterceptor} from '../services/security/http-request-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationGuard} from '../services/security/authentication.guard';


@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthenticationGuard,
    SecurityService,
    TokenService,
    ApplicationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
    ],
  exports: []
})

export class SecurityModule {
}
