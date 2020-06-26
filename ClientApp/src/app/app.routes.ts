import {HomeComponent} from './components/home/home.component';
import {MoviesTableComponent} from './components/movies-table/movies-table.component';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ActorsTableComponent} from './components/actors-table/actors-table.component';
import {ProfileComponent} from './components/profile/profile.component';

export const routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'movies', component: MoviesTableComponent},
  {path: 'movies/:id', component: MovieDetailsComponent},
  {path: 'actors', component: ActorsTableComponent},
  {path: 'actors/:id', component: ActorsTableComponent},
  {path: 'profile', component: ProfileComponent},
];
