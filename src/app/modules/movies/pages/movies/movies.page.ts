import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { MoviesService } from '../../services/movies.service';
import { MovieResponse } from '../../../shared/interfaces/movie-response.interface';
import { Genre } from '../../../shared/interfaces/genre.interface';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  private _value = '';

  set value(value: string) {
    of(value)
      .pipe(
        tap(val => this._value = val),
        filter(val => !!val),
        tap(() => this.findMovies())
      ).subscribe();
  }

  get value() {
    return this._value;
  }

  slides$: Observable<{ url: string }[]>;
  movies$: Observable<MovieResponse>;
  movieGenres$: Observable<{ genres: Genre[] }>;
  genresList$: Observable<{ id: number, name: string }[]>;

  constructor(private _service: MoviesService) {
  }

  ngOnInit() {
    this.slides$ = this._service.findAllSlides();
    this.movieGenres$ = this._service.findAllMovieGenres();
    this.movies$ = this._service.findAllMoviesByType();
  }

  onSearch(value: string) {
    this.value = value;
  }

  findMovies() {
    this.movies$ = this._service.findAllMovies(this.value, 1);
  }

  selectSegment(el) {
    this.movies$ = this._service.findAllMoviesByType(el.target.value);
    console.log(el.target.value);
  }

  onClickMovie(id: number) {
    console.log(id);
  }

  clickScroll() {
    this.content.scrollToTop(1000);
  }

  more(page: number) {
    const newPage = page + 1;
    // this.movies$ = this._service.findAllMovies(this._value, newPage)
  }

}
