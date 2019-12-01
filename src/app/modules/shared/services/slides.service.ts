import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieResponse } from '../interfaces/movies/movie-response.interface';
import { Movie } from '../interfaces/movies/movie.interface';
import { TvShow } from '../../tv-shows/interfaces/tv-show.interface';

@Injectable({ providedIn: 'root' })
export class SlidesService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  constructor(private _http: HttpClient) {
  }

  findAllMovieTrendings() {
    return this._http.get<MovieResponse<Movie>>(`${this._url}/trending/movie/day?${this._apiKey}&region=US&language=en-US&page=1`);
  }

  findAllTvShowTrendings() {
    return this._http.get<MovieResponse<TvShow>>(`${this._url}/trending/tv/day?${this._apiKey}&region=US&language=en-US&page=1`);
  }

}
