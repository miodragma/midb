import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Genre } from '../interfaces/genres/genre.interface';
import { CacheService } from 'ionic-cache';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class GenresService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _genresGroupKey = 'genresGroup';
  private _ttl = 60 * 60 * 24 * 7;

  private _genresList = new BehaviorSubject<{ genres: Genre[] }>({ genres: [] });
  private _genresTvList = new BehaviorSubject<{ genres: Genre[] }>({ genres: [] });

  private _currLng = '';

  constructor(
    private _http: HttpClient,
    private _cache: CacheService,
    private _languageService: LanguageService) {
  }

  getLng() {
    return this._languageService.selectedLocale;
  }

  get genresList() {
    return this._genresList.asObservable();
  }

  get genresTvList() {
    return this._genresTvList.asObservable();
  }

  get filterYearsList() {
    const years = [];
    const currYear = new Date().getFullYear();
    for (let i = currYear; i >= 1890; i--) {
      years.push(i);
    }
    return years;
  }

  findAllMovieGenres() {
    this.sourceMovieGenres();
  }

  sourceMovieGenres() {
    const url = `${this._url}/genre/movie/list?${this._apiKey}&language=${this.getLng()}`;
    const req = this._http.get<{ genres: Genre[] }>(url);
    this._cache.loadFromObservable(url, req, this._genresGroupKey, this._ttl)
      .pipe(
        tap(genres => this._genresList.next(genres))
      ).subscribe();
  }

  sourceTvGenres() {
    const url = `${this._url}/genre/tv/list?${this._apiKey}&language=${this.getLng()}`;
    const req = this._http.get<{ genres: Genre[] }>(url);
    this._cache.loadFromObservable(url, req, this._genresGroupKey, this._ttl)
      .pipe(
        tap(genres => this._genresTvList.next(genres))
      ).subscribe();
  }

  findAllTVGenres() {
    this.sourceTvGenres();
    this._currLng = this.getLng();
  }

}
