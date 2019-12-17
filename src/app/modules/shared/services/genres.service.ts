import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Genre } from '../interfaces/genres/genre.interface';
import { FilterGenre } from '../../filter/interfaces/filter-genre.interface';
import { FilterYear } from '../../filter/interfaces/filter-year.interface';
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

  private _filterMoviesGenresList = new BehaviorSubject<FilterGenre[]>([]);
  private _filterTVShowsGenresList = new BehaviorSubject<FilterGenre[]>([]);

  private _filterMovieYearsList = new BehaviorSubject<FilterYear[]>([]);
  private _filterTVShowsYearsList = new BehaviorSubject<FilterYear[]>([]);

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

  get filterMoviesGenresList() {
    return this._filterMoviesGenresList.asObservable();
  }

  get filterTVShowsGenresList() {
    return this._filterTVShowsGenresList.asObservable();
  }

  get filterMovieYearsList() {
    return this._filterMovieYearsList.asObservable();
  }

  get filterTVShowsYearsList() {
    return this._filterTVShowsYearsList.asObservable();
  }

  findAllMovieGenres() {
    const years = [];
    const currYear = new Date().getFullYear();
    for (let i = currYear; i >= 1890; i--) {
      years.push({ id: i, value: i, isChecked: false });
    }
    !this._filterMovieYearsList.getValue().some(year => year.isChecked) && this._filterMovieYearsList.next(years);
    if (!this._filterMoviesGenresList.getValue().length) {
      this.sourceMovieGenres();
    } else if (this._currLng !== this.getLng()) {
      this.sourceMovieGenres();
    }
  }

  sourceMovieGenres() {
    const url = `${this._url}/genre/movie/list?${this._apiKey}&language=${this.getLng()}`;
    const req = this._http.get<{ genres: Genre[] }>(url);
    this._cache.loadFromObservable(url, req, this._genresGroupKey, this._ttl)
      .pipe(
        tap(genres => {
          this._genresList.next(genres);
          const filterGenres = genres.genres.map(genre => (
            {
              ...genre,
              isChecked: false
            }
          ));
          this._filterMoviesGenresList.next(filterGenres);
        })
      ).subscribe();
  }

  sourceTvGenres() {
    const url = `${this._url}/genre/tv/list?${this._apiKey}&language=${this.getLng()}`;
    const req = this._http.get<{ genres: Genre[] }>(url);
    this._cache.loadFromObservable(url, req, this._genresGroupKey, this._ttl)
      .pipe(
        tap(genres => {
          this._genresTvList.next(genres);
          const filterGenres = genres.genres.map(genre => (
            {
              ...genre,
              isChecked: false
            }
          ));
          this._filterTVShowsGenresList.next(filterGenres);
        })
      ).subscribe();
  }

  findAllTVGenres() {
    const years = [];
    const currYear = new Date().getFullYear();
    for (let i = currYear; i >= 1890; i--) {
      years.push({ id: i, value: i, isChecked: false });
    }
    !this._filterTVShowsYearsList.getValue().some(year => year.isChecked) && this._filterTVShowsYearsList.next(years);
    if (!this._filterTVShowsGenresList.getValue().length) {
      this.sourceTvGenres();
    } else if (this._currLng !== this.getLng()) {
      this.sourceTvGenres();
      this._currLng = this.getLng();
    }
  }

  updateFilterGenres(tab: string, genre: FilterGenre) {
    if (tab === 'tv-shows') {
      const currGenres = this._filterTVShowsGenresList.getValue();
      const index = currGenres.findIndex(genres => genres.id === genre.id);
      currGenres[index] = genre;
      this._filterTVShowsGenresList.next(currGenres);
    } else {
      const currGenres = this._filterMoviesGenresList.getValue();
      const index = currGenres.findIndex(genres => genres.id === genre.id);
      currGenres[index] = genre;
      this._filterMoviesGenresList.next(currGenres);
    }
  }

  updateFilterYears(tab: string, year: FilterYear) {
    if (tab === 'tv-shows') {
      const currYears = [ ...this._filterTVShowsYearsList.getValue() ].map(years => ({ ...years, isChecked: false }));
      const index = currYears.findIndex(years => year.id === years.id);
      currYears[index].isChecked = true;
      this._filterTVShowsYearsList.next(currYears);
    } else {
      const currYears = [ ...this._filterMovieYearsList.getValue() ].map(years => ({ ...years, isChecked: false }));
      const index = currYears.findIndex(years => year.id === years.id);
      currYears[index].isChecked = true;
      this._filterMovieYearsList.next(currYears);
    }
  }

  resetGenreAndYearFilter(tab: string) {
    if (tab === 'tv-shows') {
      const currFilterYearsList = [ ...this._filterTVShowsYearsList.getValue() ];
      const currFilterGenresList = [ ...this._filterTVShowsGenresList.getValue() ];
      this._filterTVShowsYearsList.next(currFilterYearsList.map(year => ({ ...year, isChecked: false })));
      this._filterTVShowsGenresList.next(currFilterGenresList.map(genre => ({ ...genre, isChecked: false })));
    } else {
      const currFilterYearsList = [ ...this._filterMovieYearsList.getValue() ];
      const currFilterGenresList = [ ...this._filterMoviesGenresList.getValue() ];
      this._filterMovieYearsList.next(currFilterYearsList.map(year => ({ ...year, isChecked: false })));
      this._filterMoviesGenresList.next(currFilterGenresList.map(genre => ({ ...genre, isChecked: false })));
    }
  }

}
