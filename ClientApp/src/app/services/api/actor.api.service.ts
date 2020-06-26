import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Actor} from '../actor.service';

@Injectable({providedIn: 'root'})
export class ActorApiService {

  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  loadActors(): Observable<Actor[]> {
    return this._http.get<Actor[]>(`${this.baseUrl}actors`);
  }

  save(actor: Actor): Observable<Actor> {
    return this._http.post<Actor>(`${this.baseUrl}actors`, actor);
  }

}
