import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { Movie } from '../../shared/interfaces/movies/movie.interface';
import { CacheService } from 'ionic-cache';
import { tap } from 'rxjs/operators';
import { LanguageService } from '../../shared/services/language.service';

@Injectable()
export class MoviesService {

  apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  url = 'https://api.themoviedb.org/3';
  private _delayType = 'all';
  private _groupKey = 'movies';

  constructor(
    private _http: HttpClient,
    private _cache: CacheService,
    private _languageService: LanguageService) {
  }

  getLng() {
    return this._languageService.selectedLocale;
  }

  findAllMoviesByValue(value: string, page: number, refresher): Observable<MovieResponse<Movie>> {
    const url = `${this.url}/search/movie?${this.apiKey}&language=${this.getLng()}&query=${value}&page=${page}&include_adult=false`;
    const req = this._http.get<MovieResponse<Movie>>(url);
    return this.findCacheData(url, req, refresher, 60 * 60 * 2);
  }

  findAllMoviesByType(type: string, page: number, refresher): Observable<MovieResponse<Movie>> {
    const url = `${this.url}/movie/${type}?${this.apiKey}&region=US&language=${this.getLng()}&page=${page}`;
    const req = this._http.get<MovieResponse<Movie>>(url);
    return this.findCacheData(url, req, refresher, null);
  }

  findAllFilterMovies(filter: string, page: number = 1, refresher): Observable<MovieResponse<Movie>> {
    const url = `${this.url}/discover/movie?${this.apiKey}&language=${this.getLng()}&page=${page}&include_adult=false${filter}`;
    const req = this._http.get<MovieResponse<Movie>>(url);
    return this.findCacheData(url, req, refresher, 60 * 60 * 2);
  }

  findCacheData(url, req, refresher, newTTL) {
    const ttl = newTTL ? newTTL : 60 * 60 * 24;
    if (refresher) {
      return this._cache.loadFromDelayedObservable(url, req, this._groupKey, ttl, this._delayType)
        .pipe(
          tap(data => refresher.target.complete())
        );
    } else {
      return this._cache.loadFromObservable(url, req, this._groupKey, ttl);
    }
  }

}
