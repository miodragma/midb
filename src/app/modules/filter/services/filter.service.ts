import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { Actor } from '../../shared/interfaces/actors/actor.interface';
import { tap } from 'rxjs/operators';

@Injectable()
export class FilterService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _actorsList = new BehaviorSubject<MovieResponse<Actor>>({ page: 0, results: [], total_pages: 0, total_results: 0 });
  private _singleActor = new BehaviorSubject<Actor>({ id: 0, name: '', profile_path: '', known_for: [] });

  constructor(private _http: HttpClient) {
  }

  get findActorsList() {
    return this._actorsList.asObservable();
  }

  get singleActor() {
    return this._singleActor.asObservable();
  }

  findAllActors(actor: string, page: number) {
    this._http.get<MovieResponse<Actor>>(`${this._url}/search/person?${this._apiKey}&language=en-US&query=${actor}&page=${page}&include_adult=false`)
      .pipe(tap(data => this._actorsList.next(data))).subscribe();
  }

  updateFilterActor(actor: Actor) {
    this._singleActor.next(actor);
  }

  findMoreActorsByValue(actor: string, page: number) {
    this._http.get<MovieResponse<Actor>>(`${this._url}/search/person?${this._apiKey}&language=en-US&query=${actor}&page=${page}&include_adult=false`)
      .pipe(tap(data => this._actorsList.next(data))).subscribe();
  }

  removeActorsFromList() {
    this._actorsList.next({ page: 0, results: [], total_pages: 0, total_results: 0 });
  }

  resetSingleActor() {
    this._singleActor.next({ id: 0, name: '', profile_path: '', known_for: [] });
  }

}
