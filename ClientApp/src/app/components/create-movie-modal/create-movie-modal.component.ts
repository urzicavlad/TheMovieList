import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Actor, ActorService} from '../../services/actor.service';
import {Genre, MovieService} from '../../services/movie.service';


@Component({
  selector: 'app-create-movie-modal',
  templateUrl: './create-movie-modal.component.html',
})
export class CreateMovieModalComponent implements OnInit {

  movieForm: FormGroup;
  genres = new FormControl();
  actors = new FormControl();
  genreList: Genre[] = [];
  actorList: Actor[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateMovieModalComponent>,
    private formBuilder: FormBuilder,
    private actorService: ActorService
  ) {
    this.movieForm = this.formBuilder.group({
      title: [''],
      genres: this.genres,
      duration: [''],
      releaseDate: [''],
      originalTitle: [''],
      storyline: [''],
      actors: this.actors,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const movieToBeSaved = this.movieForm.getRawValue();
    console.log(`Movie to be saved: ${JSON.stringify(movieToBeSaved)}`);
    this.dialogRef.close(movieToBeSaved);
  }

  ngOnInit(): void {
    this.actorService.loadActors().subscribe(actors => this.actorList = actors);
    // this.movieService.getAvailableGenres().subscribe(genres => this.genreList = genres);
  }

}
