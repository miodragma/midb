import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movie-response.interface';
import { map, tap } from 'rxjs/operators';
import { TvShow } from '../interfaces/tv-show.interface';

@Injectable({ providedIn: 'root' })
export class SlidesTvShowService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _slidesList = new BehaviorSubject<MovieResponse<TvShow>>({ page: 0, results: [], total_results: 0, total_pages: 0 });

  constructor(private _http: HttpClient) {
  }

  get slidesList() {
    return this._slidesList.asObservable();
  }

  findAllTvShowTrendings() {
    const url = `${this._url}/trending/tv/day?${this._apiKey}`;
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


}
