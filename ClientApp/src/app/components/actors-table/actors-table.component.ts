import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Movie, MovieService} from '../../services/movie.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {ToolbarEvent} from '../toolbar/toolbar.component';
import {Actor, ActorService} from '../../services/actor.service';

@Component({
  selector: 'app-actors-table',
  templateUrl: './actors-table.component.html',
  styleUrls: ['./actors-table.component.css']
})
export class ActorsTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Actor>;
  numberOfResults: number;
  isLoadingResults = true;
  selection = new SelectionModel<Actor>(false, []);
  selected: Actor;
  isDashboardActive = false;
  isToolbarActive = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private actorService: ActorService, private router: Router) {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect(actor: Actor) {
    this.selection.toggle(actor);
    if (this.selection.isSelected(actor)) {
      console.log(`Selected element: ${actor}`);
      this.selected = actor;
      this.isToolbarActive = true;
    } else {
      console.log(`Unselected element: ${actor}`);
      this.selected = null;
      this.isToolbarActive = false;
    }
  }

  loadData() {
    console.log('Loading data!');
    this.actorService.loadActors().subscribe(actors => {
      this.isLoadingResults = false;
      this.numberOfResults = actors.length;
      this.dataSource = new MatTableDataSource<Actor>(actors);
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
        this.actorService.save();
        break;
      // case ToolbarEvent.DELETE:
      //   this.movieService.delete(this.selected);
      //   break;
      // case ToolbarEvent.EDIT:
      //   this.movieService.edit(this.selected);
      //   break;
      // case ToolbarEvent.MORE:
      //   this.router.navigate(['/movies', this.selected.id]).then(() => console.log('Successfuly navigate on /movies/:id'));
      //   break;
      // case ToolbarEvent.TOGGLE_DASHBOARD:
      //   this.isDashboardActive = !this.isDashboardActive;
      //   break;
    }
    this.actorService.getRefreshEmitter().subscribe(() => this.ngOnInit());
  }

}
