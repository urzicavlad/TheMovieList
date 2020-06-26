import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/security/token.service';
import {User} from '../movie-comment/movie-comment.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private tokenService: TokenService) {
    this.user = tokenService.getToken().user;
  }

  ngOnInit(): void {
  }

}
