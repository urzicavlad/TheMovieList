import {Component, Input, OnInit} from '@angular/core';

export class Comment {
  message: string;
  user: User;
  thumbsUp: User[];
  thumbsDown: User[];
}

export class User {
  username: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-movie-comment',
  templateUrl: './movie-comment.component.html',
  styles: [`
    .card {
      max-width: 1000px;
      margin-bottom: 10px;
    }

    .header-image {
      background-size: cover;
    }
  `]
})
export class MovieCommentComponent implements OnInit {

  @Input() comment: Comment;

  constructor() {
  }

  ngOnInit(): void {
  }

  thumbsUp() {
    console.log('Thumbs up!');
  }

  thumbsDown() {
    console.log('Thumbs down!');
  }
}
