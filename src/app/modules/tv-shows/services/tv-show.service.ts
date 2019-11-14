import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TvShow } from '../interfaces/tv-show.interface';

@Injectable()
export class TvShowService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpClient) {
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
