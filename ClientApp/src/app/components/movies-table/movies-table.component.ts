import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Movie, MovieService} from '../../services/movie.service';
import {ToolbarEvent} from '../toolbar/toolbar.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css']
})
export class MoviesTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'year', 'duration', 'releaseDate', 'originalTitle', 'imdbRating'];
  dataSource: MatTableDataSource<Movie>;
  numberOfResults: number;
  isLoadingResults = true;
  selection = new SelectionModel<Movie>(false, []);
  selected: Movie;
  isDashboardActive = false;
  isToolbarActive = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private movieService: MovieService, private router: Router) {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect(movie: Movie) {
    this.selection.toggle(movie);
    if (this.selection.isSelected(movie)) {
      console.log(`Selected element: ${movie}`);
      this.selected = movie;
      this.isToolbarActive = true;
    } else {
      console.log(`Unselected element: ${movie}`);
      this.selected = null;
      this.isToolbarActive = false;
    }
  }

  loadData() {
    console.log('Loading data!');
    this.movieService.loadMovies().subscribe(movies => {
      this.isLoadingResults = false;
      this.numberOfResults = movies.length;
      this.dataSource = new MatTableDataSource<Movie>(movies);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, () => {
      this.isLoadingResults = false;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  triggerToolbarEvent(toolbarEvent: ToolbarEvent) {
    switch (toolbarEvent) {
      case ToolbarEvent.CREATE:
        this.movieService.save(this.loadData);
        break;
      case ToolbarEvent.DELETE:
        this.movieService.delete(this.selected, this.loadData);
        break;
      case ToolbarEvent.EDIT:
        this.movieService.delete(this.selected, this.loadData);
        break;
      case ToolbarEvent.MORE:
        this.router.navigate(['/movies', this.selected.id]).then(() => console.log('Successfuly navigate on /movies/:id'));
        break;
      case ToolbarEvent.TOGGLE_DASHBOARD:
        this.isDashboardActive = !this.isDashboardActive;
        break;

    }
  }
}

