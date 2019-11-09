import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MovieResponse } from '../../../../interfaces/movies/movie-response.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from '../../../../services/loader.service';
import { MovieData } from '../../interfaces/movie-data.interface';

export class ListDataPage<T, S extends MovieData<T>> {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  private _value = '';
  private _type = 'popular';
  private _page = 1;
  private _param = '';
  private _isFilter = false;

  set value(value: string) {
    of(value)
      .pipe(
        tap(val => this._value = val),
      ).subscribe();
  }

  get value() {
    return this._value;
  }

  get type() {
    return this._type;
  }

  slides$: Observable<MovieResponse<T>>;

  movies$: Observable<MovieResponse<T>>;

  constructor(
    protected service: S,
    protected route: ActivatedRoute,
    protected loaderService: LoaderService,
    protected router: Router) {
  }

  subscription: Subscription;

  initialization() {
    this.subscription = this.route.queryParamMap
      .subscribe((params: Params) => {
        const { value, page, type, primary_release_year, with_genres, with_cast, first_air_date_year } = params.params;

        this._isFilter = !!with_genres || !!with_cast || !!primary_release_year || !!first_air_date_year;

        let isParam = false;
        Object.getOwnPropertyNames(params.params).forEach(key => {
          key && (isParam = true);
        });

        let filterQuery = '';
        with_genres && (filterQuery += '&with_genres=' + with_genres);
        with_cast && (filterQuery += '&with_cast=' + with_cast);
        primary_release_year && (filterQuery += '&primary_release_year=' + +primary_release_year);
        first_air_date_year && (filterQuery += '&first_air_date_year=' + +first_air_date_year);

        type && (this._type = type);
        !isParam && this.navigateToDefault();
        type && this.service.findAllMoviesByType(type, +page);
        value && this.service.findAllMoviesByValue(value, +page);
        this._isFilter && this.service.findAllFilterMovies(filterQuery, +page);

        this.slides$ = this.service.findAllSlides;
        this.movies$ = this.service.findMoviesList;
      });
  }

  onSearch(value: string) {
    this.value = value;
    if (value) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { value, page: 1 }
      });
    }
  }

  selectSegment(el) {
    this._type = el.target.value;
    if (el.target.value) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { type: el.target.value, page: 1 }
      });
    }
  }

  navigateToDefault() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type: 'popular', page: 1 }
    });
    this.content.scrollToTop(0);
    this._value = undefined;
  }

  onClickedPage(page: number) {
    this._page = page;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
    this.content.scrollToTop(0);
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ionViewDidLeave() {
    !this._value && this.content.scrollToTop(0);
  }
}
