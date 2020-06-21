import {Component, OnInit} from '@angular/core';
import {Movie, MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;


  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieService.loadMovies().subscribe(movies => this.movie = movies[1]);
  }

}
