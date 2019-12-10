import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieResponse } from '../interfaces/movies/movie-response.interface';
import { Movie } from '../interfaces/movies/movie.interface';
import { TvShow } from '../../tv-shows/interfaces/tv-show.interface';
import { CacheService } from 'ionic-cache';

@Injectable({ providedIn: 'root' })
export class SlidesService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _groupKey = 'movieAndTvShowsSlides';
  private _ttl = 60 * 60 * 2;

  constructor(private _http: HttpClient, private _cache: CacheService) {
  }

  findAllMovieTrendings() {
    const url = `${this._url}/trending/movie/day?${this._apiKey}&region=US&language=en-US&page=1`;
    const req = this._http.get<MovieResponse<Movie>>(url);
    return this._cache.loadFromObservable(url, req, this._groupKey, this._ttl);
  }

  findAllTvShowTrendings() {
    const url = `${this._url}/trending/tv/day?${this._apiKey}&region=US&language=en-US&page=1`;
    const req = this._http.get<MovieResponse<TvShow>>(url);
    return this._cache.loadFromObservable(url, req, this._groupKey, this._ttl);
  }

}
