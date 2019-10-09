import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../../../interfaces/genre.interface';
import { MovieResponse } from '../../../interfaces/movie-response.interface';
import { of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'data-list',
  templateUrl: 'data-list.view.html',
  styleUrls: [ 'data-list.view.scss' ]
})
export class DataListView {

  @Output() clicked = new EventEmitter<number>();
  @Output() scroll = new EventEmitter();
  @Output() more = new EventEmitter<number>();

  @Input() genres: Genre[];

  @Input() set movies(movies: MovieResponse) {
    of(movies)
      .pipe(
        filter(movie => !!movie),
        tap(data => {
          this._movies = data;
          this.currentMovies = data;
        })
      ).subscribe();
  }

  private _movies: MovieResponse;

  customAlertOptions: any = {
    header: 'Select genre',
    translucent: true
  };

  selectedGenre = 'All genres';
  currentMovies: MovieResponse;

  changeGenre(event) {
    const currGenre = event.target.value;
    this.selectedGenre = currGenre.name;
    currGenre.name === 'All genres' ? this._movies = this.currentMovies :
      this._movies = {
        ...this._movies,
        results: this._movies.results.filter(movie => movie.genre_ids.some(genre => genre === currGenre.id))
      };
  }

}
