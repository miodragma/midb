import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { TvShow } from '../interfaces/tv-show.interface';

@Injectable()
export class TvShowService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';

  private _slidesList = new BehaviorSubject<MovieResponse<TvShow>>({ page: 0, results: [], total_pages: 0, total_results: 0 });

  constructor(private _http: HttpClient) {
  }

  get findAllSlides() {
    return this._slidesList.asObservable();
  }

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

  findAllMoviesByValue(value: string, page: number): Observable<MovieResponse<TvShow>> {
    return this._http.get<MovieResponse<TvShow>>(`
    ${this.url}/search/tv?${this.apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`)
      .pipe(tap(data => data));
  }

  findAllMoviesByType(type: string, page: number): Observable<MovieResponse<TvShow>> {
    return this._http.get<MovieResponse<TvShow>>(`${this.url}/tv/${type}?${this.apiKey}&region=US&language=en-US&page=${page}`)
      .pipe(tap(data => data));
  }

  findAllFilterMovies(filter: string, page: number): Observable<MovieResponse<TvShow>> {
    return this._http.get<MovieResponse<TvShow>>(`
    ${this.url}/discover/tv?${this.apiKey}&language=en-US&page=${page}&include_adult=false${filter}`)
      .pipe(tap(data => data));
  }

}
