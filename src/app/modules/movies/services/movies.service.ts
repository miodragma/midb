import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movie-response.interface';
import { Genre } from '../../shared/interfaces/genre.interface';
import { tap } from 'rxjs/operators';

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

  findAllMovieGenres(): Observable<{ genres: Genre[] }> {
    return this._http.get<{ genres: Genre[] }>(`${this._url}/genre/movie/list?${this._apiKey}&language=en-US`);
  }

  findAllMoviesByValue(value: string, page: number): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this._url}/search/movie?${this._apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`)
      .pipe(tap(data => this._moviesList.next(data)));
  }

  findMoreMoviesByValue(value: string, page: number): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this._url}/search/movie?${this._apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`)
      .pipe(tap(data => this._moviesList.next({ ...data, results: [ ...this._moviesList.getValue().results, ...data.results ] })));
  }

  findAllMoviesByType(type: string = 'popular', page: number = 1): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this._url}/movie/${type}?${this._apiKey}&region=US&language=en-US&page=${page}`)
      .pipe(tap(data => this._moviesList.next(data)));
  }

  findMoreMoviesByType(type: string, page: number): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this._url}/movie/${type}?${this._apiKey}&region=US&language=en-US&page=${page}`)
      .pipe(tap(data => this._moviesList.next({ ...data, results: [ ...this._moviesList.getValue().results, ...data.results ] })));
  }

}
