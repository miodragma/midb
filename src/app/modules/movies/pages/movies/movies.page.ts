import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { MoviesService } from '../../services/movies.service';
import { MovieResponse } from '../../../shared/interfaces/movie-response.interface';
import { Genre } from '../../../shared/interfaces/genre.interface';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  private _value = '';
  private _type = 'popular';

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

  constructor(
    private _service: MoviesService,
    private _loaderService: LoaderService) {
  }

  ngOnInit() {
    this.slides$ = this._service.findAllSlides();
    this.movieGenres$ = this._service.findAllMovieGenres();
    this._service.findAllMoviesByType().subscribe();
    this.movies$ = this._service.findMoviesList;
  }

  onSearch(value: string) {
    this.value = value;
  }

  findMovies() {
    this._type = '';
    this._service.findAllMoviesByValue(this.value, 1).subscribe();
  }

  selectSegment(el) {
    this._loaderService.loaderStart();
    this._type = el.target.value;
    this._service.findAllMoviesByType(el.target.value).subscribe();
  }

  onClickMovie(id: number) {
    console.log(id);
  }

  clickScroll() {
    this.content.scrollToTop(1000);
  }

  more(page: number) {
    const newPage = page + 1;
    this._value && this._service.findMoreMoviesByValue(this._value, newPage).subscribe();
    !this._value && this._service.findMoreMoviesByType(this._type, newPage).subscribe();
  }

}
