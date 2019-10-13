import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Genre } from '../interfaces/genre.interface';
import { FilterGenre } from '../../filter/interfaces/filter-genre.interface';
import { FilterYear } from '../../filter/interfaces/filter-year.interface';

@Injectable({ providedIn: 'root' })
export class GenresService {

  private _apiKey = 'api_key=e78954865ca9c1de70cf8701f4a24d26';
  private _url = 'https://api.themoviedb.org/3';

  private _filterMoviesGenresList = new BehaviorSubject<FilterGenre[]>([]);
  private _genresList = new BehaviorSubject<{ genres: Genre[] }>({ genres: [] });
  private _filterYearsList = new BehaviorSubject<FilterYear[]>([]);

  constructor(private _http: HttpClient) {
  }

  get filterMoviesGenresList() {
    return this._filterMoviesGenresList.asObservable();
  }

  get genresList() {
    return this._genresList.asObservable();
  }

  get filterYearsList() {
    return this._filterYearsList.asObservable();
  }

  findAllMovieGenres() {
    const years = [];
    const currYear = new Date().getFullYear();
    for (let i = new Date().getFullYear(); i >= 1890; i--) {
      years.push({ id: i, value: i, isChecked: false });
    }
    this._filterYearsList.next(years);
    this._http.get<{ genres: Genre[] }>(`${this._url}/genre/movie/list?${this._apiKey}&language=en-US`)
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

  updateFilterGenres(genre: FilterGenre) {
    const currGenres = this._filterMoviesGenresList.getValue();
    const index = currGenres.findIndex(genres => genres.id === genre.id);
    currGenres[index] = genre;
    this._filterMoviesGenresList.next(currGenres);
  }

  updateFilterYears(year: FilterYear) {
    const currYears = this._filterYearsList.getValue();
    const index = currYears.findIndex(years => year.id === years.id);
    currYears[index].isChecked = true;
    this._filterYearsList.next(currYears);
  }

}
