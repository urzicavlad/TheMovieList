import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

export class Actor {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private _http: HttpClient,
              @Inject('BASE_URL') private baseUrl: string) {
  }

  loadActors(): Observable<Actor[]> {
    // return this._http.get<Actor[]>(`${this.baseUrl}actors`);
    const actors = [
      {id: 1, name: 'Al Pacino'},
      {id: 2, name: 'James Caan'},
      {id: 3, name: 'Marlon Brando'},
      {id: 4, name: 'Tim Robbins'},
      {id: 5, name: 'Morgan Freeman'},
      {id: 6, name: 'Bob Gunton'},
    ];
    return of(actors);
  }
}
