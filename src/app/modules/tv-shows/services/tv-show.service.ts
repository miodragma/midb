import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { HttpClient } from '@angular/common/http';
import { TvShow } from '../interfaces/tv-show.interface';
import { tap } from 'rxjs/operators';
import { CacheService } from 'ionic-cache';

@Injectable()
export class TvShowService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';
  private _delayTime = 'all';
  private _groupKey = 'tvShows';

  constructor(private _http: HttpClient, private _cache: CacheService) {
  }

  findAllMoviesByValue(value: string, page: number, refresher): Observable<MovieResponse<TvShow>> {
    const url = `${this.url}/search/tv?${this.apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`;
    const req = this._http.get<MovieResponse<TvShow>>(url);
    return this.findCacheData(url, req, refresher, 60 * 60 * 2);
  }

  findAllMoviesByType(type: string, page: number, refresher): Observable<MovieResponse<TvShow>> {
    const url = `${this.url}/tv/${type}?${this.apiKey}&region=US&language=en-US&page=${page}`;
    const req = this._http.get<MovieResponse<TvShow>>(url);
    return this.findCacheData(url, req, refresher, null);
  }

  findAllFilterMovies(filter: string, page: number, refresher): Observable<MovieResponse<TvShow>> {
    const url = `${this.url}/discover/tv?${this.apiKey}&language=en-US&page=${page}&include_adult=false${filter}`;
    const req = this._http.get<MovieResponse<TvShow>>(url);
    return this.findCacheData(url, req, refresher, 60 * 60 * 2);
  }

  findCacheData(url, req, refresher, newTTL) {
    const ttl = newTTL ? newTTL : 60 * 60 * 24;
    if (refresher) {
      return this._cache.loadFromDelayedObservable(url, req, this._groupKey, ttl, this._delayTime)
        .pipe(
          tap(data => refresher.target.complete())
        );
    } else {
      return this._cache.loadFromObservable(url, req, this._groupKey, ttl);
    }
  }

}
