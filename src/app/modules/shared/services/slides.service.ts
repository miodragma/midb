import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { MovieResponse } from '../interfaces/movies/movie-response.interface';
import { Movie } from '../interfaces/movies/movie.interface';
import { map } from 'rxjs/operators';
import { TvShow } from '../../tv-shows/interfaces/tv-show.interface';

@Injectable({ providedIn: 'root' })
export class SlidesService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpClient) {
  }

  private _slidesMovieList = new BehaviorSubject<MovieResponse<Movie>>({ page: 0, results: [], total_results: 0, total_pages: 0 });
  private _slidesTvShowList = new BehaviorSubject<MovieResponse<TvShow>>({ page: 0, results: [], total_pages: 0, total_results: 0 });

  get findAllMovieSlides() {
    return this._slidesMovieList.asObservable();
  }

  get findAllTvShowSlides() {
    return this._slidesTvShowList.asObservable();
  }

  findAllMovieTrendings() {
    const url = `${this._url}/trending/movie/day?${this._apiKey}`;
    return forkJoin([
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
      );
  }

  findAllTvShowTrendings() {
    const url = `${this._url}/trending/tv/day?${this._apiKey}`;
    return forkJoin([
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
      );
  }

}
