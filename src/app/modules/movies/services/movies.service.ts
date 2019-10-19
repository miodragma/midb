import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MovieResponse } from '../../shared/interfaces/movie-response.interface';
import { Movie } from '../../shared/interfaces/movie.interface';

@Injectable()
export class MoviesService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';

  private _moviesList = new BehaviorSubject<MovieResponse<Movie>>({ page: 0, results: [], total_pages: 0, total_results: 0 });
  private _slidesList = new BehaviorSubject<MovieResponse<Movie>>({ page: 0, results: [], total_results: 0, total_pages: 0 });

  constructor(private _http: HttpClient) {
  }

  get findMoviesList() {
    return this._moviesList.asObservable();
  }

  get findAllSlides() {
    return this._slidesList.asObservable();
  }

  findAllMovieTrendings() {
    const url = `${this.url}/trending/movie/day?${this.apiKey}`;
    forkJoin([
      this._http.get<MovieResponse<Movie>>(`${url}&page=1`),
      this._http.get<MovieResponse<Movie>>(`${url}&page=2)`)
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
    this._http.get<MovieResponse<Movie>>(`
    ${this.url}/${type}/movie?${this.apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false${filter}`)
      .pipe(tap(data => this._moviesList.next(data))).subscribe();
  }

  findMoreMoviesByValue(value: string, page: number, param: string) {
    const type = !!param ? 'discover' : 'search';
    const filter = !!param ? param : '';
    this._http.get<MovieResponse<Movie>>(`
    ${this.url}/${type}/movie?${this.apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false${filter}`)
      .pipe(tap(data => this._moviesList.next({
        ...data,
        results: [ ...this._moviesList.getValue().results, ...data.results ]
      }))).subscribe();
  }

  findAllMoviesByType(type: string = 'popular', page: number = 1, param: string) {
    const filter = !!param ? param : '';
    const isDiscover = param === '' ? `/movie/${type}` : `/discover/movie`;
    return this._http.get<MovieResponse<Movie>>(`${this.url}${isDiscover}?${this.apiKey}&region=US&language=en-US&page=${page}${filter}`)
      .pipe(tap(data => this._moviesList.next(data))).subscribe();
  }

  findMoreMoviesByType(type: string, page: number, param: string) {
    const filter = !!param ? param : '';
    const isDiscover = param === '' ? `/movie/${type}` : `/discover/movie`;
    this._http.get<MovieResponse<Movie>>(`${this.url}${isDiscover}?${this.apiKey}&region=US&language=en-US&page=${page}${filter}`)
      .pipe(tap(data => this._moviesList.next({
        ...data,
        results: [ ...this._moviesList.getValue().results, ...data.results ]
      }))).subscribe();
  }

}
