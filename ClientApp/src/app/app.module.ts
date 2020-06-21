import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {HomeComponent} from './components/home/home.component';
import {MoviesTableComponent} from './components/movies-table/movies-table.component';
import {routes} from './app.routes';
import {AngularMaterialModule} from './modules/angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {YesNoDialogComponent} from './components/yes-no-dialog/yes-no-dialog.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {CreateMovieModalComponent} from './components/create-movie-modal/create-movie-modal.component';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {MovieCommentComponent} from './components/movie-comment/movie-comment.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {SecurityModule} from './modules/security.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MoviesTableComponent,
    YesNoDialogComponent,
    ToolbarComponent,
    CreateMovieModalComponent,
    MovieDetailsComponent,
    MovieCommentComponent,
    MovieCommentComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    SecurityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
