import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MovieResponse } from '../../shared/interfaces/movie-response.interface';

@Injectable()
export class MoviesService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _moviesList = new BehaviorSubject<MovieResponse>({ page: 0, results: [], total_pages: 0, total_results: 0 });

  constructor(private _http: HttpClient) {
  }

  get findMoviesList() {
    return this._moviesList.asObservable();
  }

  findAllMoviesByValue(value: string, page: number, param: string) {
    const type = !!param ? 'discover' : 'search';
    const filter = !!param ? param : '';
    this._http.get<MovieResponse>(`
    ${this._url}/${type}/movie?${this._apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false${filter}`)
      .pipe(tap(data => this._moviesList.next(data))).subscribe();
  }

  findMoreMoviesByValue(value: string, page: number, param: string) {
    const type = !!param ? 'discover' : 'search';
    const filter = !!param ? param : '';
    return this._http.get<MovieResponse>(`
    ${this._url}/${type}/movie?${this._apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false${filter}`)
      .pipe(tap(data => this._moviesList.next({
        ...data,
        results: [ ...this._moviesList.getValue().results, ...data.results ]
      }))).subscribe();
  }

  findAllMoviesByType(type: string = 'popular', page: number = 1, param: string) {
    const filter = !!param ? param : '';
    return this._http.get<MovieResponse>(`${this._url}/movie/${type}?${this._apiKey}&region=US&language=en-US&page=${page}${filter}`)
      .pipe(tap(data => this._moviesList.next(data))).subscribe();
  }

  findMoreMoviesByType(type: string, page: number, param: string) {
    const filter = !!param ? param : '';
    return this._http.get<MovieResponse>(`${this._url}/movie/${type}?${this._apiKey}&region=US&language=en-US&page=${page}${filter}`)
      .pipe(tap(data => this._moviesList.next({
        ...data,
        results: [ ...this._moviesList.getValue().results, ...data.results ]
      }))).subscribe();
  }

}
