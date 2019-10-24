import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { Actor } from '../../shared/interfaces/actors/actor.interface';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Injectable()
export class CelebritiesService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _actorsList = new BehaviorSubject<MovieResponse<Actor>>({ page: 0, results: [], total_pages: 0, total_results: 0 });
  private _slidesList = new BehaviorSubject<MovieResponse<Actor>>({ page: 0, results: [], total_results: 0, total_pages: 0 });

  constructor(private _http: HttpClient) {
  }

  get findActorsList() {
    return this._actorsList.asObservable();
  }

  get findAllSlides() {
    return this._slidesList.asObservable();
  }

  findAllActors(actor: string, page: number) {
    this._http.get<MovieResponse<Actor>>(`${this._url}/search/person?${this._apiKey}&language=en-US&query=${actor}&page=${page}&include_adult=false`)
      .pipe(tap(data => this._actorsList.next(data))).subscribe();
  }

  findMoreActorsByValue(actor: string, page: number) {
    this._http.get<MovieResponse<Actor>>(`${this._url}/search/person?${this._apiKey}&language=en-US&query=${actor}&page=${page}&include_adult=false`)
      .pipe(tap(data => this._actorsList.next({
        ...data,
        results: [ ...this._actorsList.getValue().results, ...data.results ]
      }))).subscribe();
  }

  removeActorsFromList() {
    this._actorsList.next({ page: 0, results: [], total_pages: 0, total_results: 0 });
  }

  findAllActorTrendings() {
    const url = `${this._url}/trending/person/day?${this._apiKey}`;
    forkJoin([
      this._http.get<MovieResponse<Actor>>(`${url}&page=1`),
      this._http.get<MovieResponse<Actor>>(`${url}&page=2)`)
    ])
      .pipe(
        map(trending => {
          const [ firstTrending, secondTrending ] = trending;
          firstTrending.results = firstTrending.results.filter(actor => actor.profile_path !== null);
          secondTrending.results = secondTrending.results.filter(actor => actor.profile_path !== null);
          return {
            ...firstTrending,
            results: [ ...firstTrending.results, ...secondTrending.results ]
          };
        }),
        tap(trending => this._slidesList.next(trending))
      ).subscribe();
  }

}
