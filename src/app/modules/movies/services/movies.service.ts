import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { Movie } from '../../shared/interfaces/movies/movie.interface';

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

  get val() {
    return this._moviesList.getValue();
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

  findAllMoviesByValue(value: string, page: number) {
    this._http.get<MovieResponse<Movie>>(`
    ${this.url}/search/movie?${this.apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`)
      .pipe(tap(data => this._moviesList.next(data))).subscribe();
  }

  findAllMoviesByType(type: string, page: number) {
    return this._http.get<MovieResponse<Movie>>(`${this.url}/movie/${type}?${this.apiKey}&region=US&language=en-US&page=${page}`)
      .pipe(tap(data => this._moviesList.next(data))).subscribe();
  }

  findAllFilterMovies(filter: string, page: number = 1) {
    this._http.get<MovieResponse<Movie>>(`
    ${this.url}/discover/movie?${this.apiKey}&language=en-US&page=${page}&include_adult=false${filter}`)
      .pipe(tap(data => this._moviesList.next(data))).subscribe();
  }

}
