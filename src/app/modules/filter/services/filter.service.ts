import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { Actor } from '../../shared/interfaces/actors/actor.interface';
import { LanguageService } from '../../shared/services/language.service';

@Injectable()
export class FilterService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _singleActor = new BehaviorSubject<Actor>({ id: 0, name: '', profile_path: '', known_for: [] });

  constructor(private _http: HttpClient,
              private _languageService: LanguageService) {
  }

  getLng() {
    return this._languageService.selectedLocale;
  }

  get singleActor() {
    return this._singleActor.asObservable();
  }

  findAllActors(actor: string, page: number): Observable<MovieResponse<Actor>> {
    return this._http.get<MovieResponse<Actor>>(`${this._url}/search/person?${this._apiKey}&language=${this.getLng()}&query=${actor}&page=${page}&include_adult=false`);
  }

  updateFilterActor(actor: Actor) {
    this._singleActor.next(actor);
  }

  findMoreActorsByValue(actor: string, page: number): Observable<MovieResponse<Actor>> {
    return this._http.get<MovieResponse<Actor>>(`${this._url}/search/person?${this._apiKey}&language=${this.getLng()}&query=${actor}&page=${page}&include_adult=false`);
  }

  resetSingleActor() {
    this._singleActor.next({ id: 0, name: '', profile_path: '', known_for: [] });
  }

}
