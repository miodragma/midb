import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { Actor } from '../../shared/interfaces/actors/actor.interface';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { CacheService } from 'ionic-cache';

@Injectable()
export class CelebritiesService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _slidesGroupKey = 'actorSlides';
  private _actorsGroupKey = 'actorsList';
  private _ttl = 60 * 60 * 2;
  private _delayType = 'all';

  private _actorsList = new BehaviorSubject<MovieResponse<Actor>>({ page: 0, results: [], total_pages: 0, total_results: 0 });
  private _slidesList = new BehaviorSubject<MovieResponse<Actor>>({ page: 0, results: [], total_results: 0, total_pages: 0 });

  constructor(private _http: HttpClient, private _cache: CacheService) {
  }

  get findActorsList() {
    return this._actorsList.asObservable();
  }

  get findAllSlides() {
    return this._slidesList.asObservable();
  }

  findAllActors(actor: string, page: number) {
    const url = `${this._url}/search/person?${this._apiKey}&language=en-US&query=${actor}&page=${page}&include_adult=false`;
    const req = this._http.get<MovieResponse<Actor>>(url);
    return this._cache.loadFromObservable(url, req, this._actorsGroupKey, this._ttl)
      .pipe(tap(data => this._actorsList.next(data))).subscribe();
  }

  findMoreActorsByValue(actor: string, page: number, refresher?) {
    const url = `${this._url}/search/person?${this._apiKey}&language=en-US&query=${actor}&page=${page}&include_adult=false`;
    const req = this._http.get<MovieResponse<Actor>>(url);
    if (refresher) {
      return this._cache.loadFromDelayedObservable(url, req, this._actorsGroupKey, this._ttl, this._delayType)
        .subscribe(data => {
          this._actorsList.next(data);
          refresher.target.complete();
        });
    } else {
      return this._cache.loadFromObservable(url, req, this._actorsGroupKey, this._ttl)
        .pipe(tap(data => this._actorsList.next(data))).subscribe();
    }
  }

  removeActorsFromList() {
    this._actorsList.next({ page: 0, results: [], total_pages: 0, total_results: 0 });
  }

  firstActorsList() {
    const url = `${this._url}/trending/person/day?${this._apiKey}&page=1`;
    const req = this._http.get<MovieResponse<Actor>>(url);
    return this._cache.loadFromObservable(url, req, this._slidesGroupKey, this._ttl);
  }

  secondActorsList() {
    const url = `${this._url}/trending/person/day?${this._apiKey}&page=2`;
    const req = this._http.get<MovieResponse<Actor>>(url);
    return this._cache.loadFromObservable(url, req, this._slidesGroupKey, this._ttl);
  }

  findAllActorTrendings() {
    forkJoin([
      this.firstActorsList(),
      this.secondActorsList()
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
