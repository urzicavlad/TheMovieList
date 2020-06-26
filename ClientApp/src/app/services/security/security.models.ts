import {User} from '../../components/movie-comment/movie-comment.component';

export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  password: string;
  username: string;
  role: string;
  avatar: string;
}

export interface Token {
  value: string;
  expiry: Date;
  email: string;
  user: User;
}
