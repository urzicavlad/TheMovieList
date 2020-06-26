import {Component, OnInit} from '@angular/core';
import {Movie, MovieService} from '../../services/movie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieApiService} from '../../services/api/movie.api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;


  constructor(private movieApiService: MovieApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = Number(params.get('id'));
      this.movieApiService.getMovie(movieId).subscribe(movie => {
        this.movie = movie;
      });
    });
  }

  loadComments() {
    this.movieApiService.getMovieComments(this.movie.id).subscribe(comments => this.movie.comments = comments);
  }
}
