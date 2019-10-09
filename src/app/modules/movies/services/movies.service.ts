import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movie-response.interface';
import { Genre } from '../../shared/interfaces/genre.interface';

@Injectable()
export class MoviesService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpClient) {
  }

  findAllSlides(): Observable<{ url: string }[]> {
    return of<{ url: string }[]>([
      { url: './assets/slides/1.jpg' },
      { url: './assets/slides/2.jpg' },
      { url: './assets/slides/3.jpg' },
      { url: './assets/slides/4.jpg' },
      { url: './assets/slides/5.jpg' },
      { url: './assets/slides/6.jpg' },
      { url: './assets/slides/7.jpg' },
      { url: './assets/slides/8.jpg' }
    ]);
  }

  findAllMovies(value: string, page: number): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this._url}/search/movie?${this._apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`);
  }

  findAllMovieGenres(): Observable<{ genres: Genre[] }> {
    return this._http.get<{ genres: Genre[] }>(`${this._url}/genre/movie/list?${this._apiKey}&language=en-US`);
  }

  findAllMoviesByType(type: string = 'popular', page: number = 1): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this._url}/movie/${type}?${this._apiKey}&region=US&language=en-US&page=${page}`);
  }

}
