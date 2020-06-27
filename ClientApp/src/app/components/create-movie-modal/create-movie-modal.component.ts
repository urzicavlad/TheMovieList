import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Actor} from '../../services/actor.service';
import {MovieApiService} from '../../services/api/movie.api.service';
import {ActorApiService} from '../../services/api/actor.api.service';
import {Movie} from '../../services/movie.service';


@Component({
  selector: 'app-create-movie-modal',
  templateUrl: './create-movie-modal.component.html',
})
export class CreateMovieModalComponent implements OnInit {

  movieForm: FormGroup;
  genres = new FormControl();
  actors = new FormControl();
  genreList: string[] = [];
  actorList: Actor[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    public dialogRef: MatDialogRef<CreateMovieModalComponent>,
    private formBuilder: FormBuilder,
    private actorApiService: ActorApiService,
    private movieApiService: MovieApiService
  ) {
    this.assignDefaultValues();
    this.movieForm = this.formBuilder.group({
      title: [''],
      genres: this.genres,
      duration: [''],
      releaseDate: [''],
      originalTitle: [''],
      storyline: [''],
      posterUrl: [''],
      actors: this.actors,
    });
  }

  assignDefaultValues() {
    if (this.data === null) {
      this.data = {
        actors: [],
        comments: [],
        duration: '',
        genres: [],
        id: 0,
        originalTitle: '',
        posterUrl: '',
        releaseDate: '',
        storyLine: '',
        title: ''
      };
    }
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
    this.actorApiService.loadActors().subscribe(actors => this.actorList = actors);
    this.movieApiService.getAvailableGenres().subscribe(genres => this.genreList = genres);
  }

}
