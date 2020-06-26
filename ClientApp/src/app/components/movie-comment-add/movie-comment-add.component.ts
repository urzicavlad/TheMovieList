import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MovieApiService} from '../../services/api/movie.api.service';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '../movie-comment/movie-comment.component';
import {TokenService} from '../../services/security/token.service';

@Component({
  selector: 'app-movie-comment-add',
  templateUrl: './movie-comment-add.component.html',
  styleUrls: ['./movie-comment-add.component.css']
})
export class MovieCommentAddComponent implements OnInit {

  commentForm: FormGroup;
  @Output() refreshEmitter = new EventEmitter<void>();


  constructor(
    private formBuilder: FormBuilder,
    private movieApiService: MovieApiService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
    this.commentForm = this.formBuilder.group({
      message: [''],
    });
  }


  ngOnInit(): void {
  }

  onSubmit() {
    const commentMessage = this.commentForm.getRawValue();
    console.log(`Comment to be saved: ${JSON.stringify(commentMessage)}`);
    this.route.paramMap.subscribe(params => {
      const movieId = Number(params.get('id'));
      const comment = new Comment();
      comment.message = commentMessage.message;
      comment.author = this.tokenService.getToken().user;
      comment.thumbsUp = [];
      comment.thumbsDown = [];
      console.log(`Comment : ${JSON.stringify(comment)} will be saved!`);
      this.movieApiService.addComment(movieId, comment).subscribe(() => {
        this.refreshEmitter.emit();
      });
    });

  }

}
