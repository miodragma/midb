import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { MovieResponse } from '../../../../interfaces/movie-response.interface';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../../services/loader.service';
import { MovieData } from '../../interfaces/movie-data.interface';

export class ListDataPage<T, S extends MovieData<T>> {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  private _value = '';
  private _type = 'popular';
  private _param = '';
  private _isFilter = false;

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

  slides$: Observable<MovieResponse<T>>;

  movies$: Observable<MovieResponse<T>>;

  constructor(
    protected service: S,
    protected route: ActivatedRoute,
    protected loaderService: LoaderService) {
  }

  initialization() {
    this.route.queryParamMap.pipe(
      map(param => {
        let newParam = '';
        param.has('with_genres') && (newParam += '&with_genres=' + param.get('with_genres'));
        param.has('with_cast') && (newParam += '&with_cast=' + param.get('with_cast'));
        param.has('primary_release_year') && (newParam += '&primary_release_year=' + +param.get('primary_release_year'));
        this._isFilter = !!param.get('with_genres') || !!param.get('with_cast') || !!+param.get('primary_release_year');
        return this._isFilter ? newParam : '';
      }),
    ).subscribe(param => {
      this._param = param;
      this.slides$ = this.service.findAllSlides;
      this.movies$ = this.service.findMoviesList;
      this.service.findAllMoviesByType(undefined, undefined, this._param);
    });
  }

  onSearch(value: string) {
    this.value = value;
    !value && this.service.findAllMoviesByType(undefined, undefined, this._param);
  }

  findMovies() {
    this._type = '';
    this.service.findAllMoviesByValue(this.value, 1, this._param);
  }

  selectSegment(el) {
    this._type = el.target.value;
    this.service.findAllMoviesByType(el.target.value, undefined, this._param);
  }

  onClickMovie(id: number) {
    console.log(id);
  }

  clickScroll() {
    this.content.scrollToTop(1000);
  }

  more(page: number) {
    const newPage = page + 1;
    this._value && this.service.findMoreMoviesByValue(this._value, newPage, this._param);
    !this._value && this.service.findMoreMoviesByType(this._type, newPage, this._param);
  }
}
