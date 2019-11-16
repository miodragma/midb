import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { Movie } from '../../shared/interfaces/movies/movie.interface';

@Injectable()
export class MoviesService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpClient) {
  }

  findAllMoviesByValue(value: string, page: number): Observable<MovieResponse<Movie>> {
    return this._http.get<MovieResponse<Movie>>(`
    ${this.url}/search/movie?${this.apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`);
  }

  findAllMoviesByType(type: string, page: number): Observable<MovieResponse<Movie>> {
    return this._http.get<MovieResponse<Movie>>(`${this.url}/movie/${type}?${this.apiKey}&region=US&language=en-US&page=${page}`);
  }

  findAllFilterMovies(filter: string, page: number = 1): Observable<MovieResponse<Movie>> {
    return this._http.get<MovieResponse<Movie>>(`
    ${this.url}/discover/movie?${this.apiKey}&language=en-US&page=${page}&include_adult=false${filter}`);
  }

}
