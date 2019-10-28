import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { TvShow } from '../interfaces/tv-show.interface';

@Injectable()
export class TvShowService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';

  private _moviesList = new BehaviorSubject<MovieResponse<TvShow>>({ page: 0, results: [], total_pages: 0, total_results: 0 });
  private _slidesList = new BehaviorSubject<MovieResponse<TvShow>>({ page: 0, results: [], total_pages: 0, total_results: 0 });

  constructor(private _http: HttpClient) {
  }

  get findMoviesList() {
    return this._moviesList.asObservable();
  }

  get findAllSlides() {
    return this._slidesList.asObservable();
  }

  getFirstVal = true;

  findAllMovieTrendings() {
    const url = `${this.url}/trending/tv/day?${this.apiKey}`;
    forkJoin([
      this._http.get<MovieResponse<TvShow>>(`${url}&page=1`),
      this._http.get<MovieResponse<TvShow>>(`${url}&page=2)`)
    ])
      .pipe(
        map(trending => (
          {
            ...trending[0],
            results: [ ...trending[0].results, ...trending[1].results ]
          }
        )),
        tap(trending => this._slidesList.next(trending))
      ).subscribe();
  }

  findAllMoviesByValue(value: string, page: number, param: string) {
    const type = !!param ? 'discover' : 'search';
    const filter = !!param ? param : '';
    this._http.get<MovieResponse<TvShow>>(`
    ${this.url}/${type}/tv?${this.apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false${filter}`)
      .pipe(tap(data => this._moviesList.next(data))).subscribe();
  }

  findMoreMoviesByValue(value: string, page: number, param: string) {
    const type = !!param ? 'discover' : 'search';
    const filter = !!param ? param : '';
    this._http.get<MovieResponse<TvShow>>(`
    ${this.url}/${type}/tv?${this.apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false${filter}`)
      .pipe(tap(data => this._moviesList.next({
        ...data,
        results: [ ...this._moviesList.getValue().results, ...data.results ]
      }))).subscribe();
  }

  findAllMoviesByType(type: string = 'popular', page: number = 1, param: string) {
    this.getFirstVal = false;
    const filter = !!param ? param : '';
    const isDiscover = param === '' ? `/tv/${type}` : `/discover/tv`;
    return this._http.get<MovieResponse<TvShow>>(`${this.url}${isDiscover}?${this.apiKey}&region=US&language=en-US&page=${page}${filter}`)
      .pipe(tap(data => this._moviesList.next(data))).subscribe();
  }

  findMoreMoviesByType(type: string, page: number, param: string) {
    const filter = !!param ? param : '';
    const isDiscover = param === '' ? `/tv/${type}` : `/discover/tv`;
    this._http.get<MovieResponse<TvShow>>(`${this.url}${isDiscover}?${this.apiKey}&region=US&language=en-US&page=${page}${filter}`)
      .pipe(tap(data => this._moviesList.next({
        ...data,
        results: [ ...this._moviesList.getValue().results, ...data.results ]
      }))).subscribe();
  }

}
