import { Component, EventEmitter, Input, Output } from '@angular/core';
import { of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { LoaderService } from '../../../services/loader.service';
import { Genre } from '../../../interfaces/genre.interface';
import { MovieResponse } from '../../../interfaces/movie-response.interface';
import { Movie } from '../../../interfaces/movie.interface';

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

  @Input() set movies(movies: MovieResponse<Movie>) {
    of(movies)
      .pipe(
        filter(movie => movie.page > 0 || !!movie.results.length),
        tap(data => {
          this._movies = data;
          // this._loaderService.loaderStop();
        })
      ).subscribe();
  }

  get movies() {
    return this._movies;
  }

  private _movies: MovieResponse<Movie>;

  constructor(private _loaderService: LoaderService) {
  }

}
