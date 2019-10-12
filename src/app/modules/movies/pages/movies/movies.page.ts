import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { MoviesService } from '../../services/movies.service';
import { MovieResponse } from '../../../shared/interfaces/movie-response.interface';
import { Genre } from '../../../shared/interfaces/genre.interface';
import { LoaderService } from '../../../shared/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { GenresService } from '../../../shared/services/genres.service';
import { SlidesService } from '../../../shared/services/slides.service';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  private _value = '';
  private _type = 'popular';
  private _param = '';

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

  slides$: Observable<MovieResponse>;
  movies$: Observable<MovieResponse>;
  movieGenres$: Observable<{ genres: Genre[] }>;

  constructor(
    private _service: MoviesService,
    private _genresService: GenresService,
    private _slidesService: SlidesService,
    private _route: ActivatedRoute,
    private _loaderService: LoaderService) {
  }

  ngOnInit() {
    this.slides$ = this._slidesService.slidesList;
    this.movieGenres$ = this._genresService.genresList;
    this.movies$ = this._service.findMoviesList;
    this._route.queryParamMap.pipe(
      map(param => {
        let newParam = '';
        param.has('with_genres') && (newParam += '&with_genres=' + param.get('with_genres'));
        param.has('with_cast') && (newParam += '&with_cast=' + param.get('with_cast'));
        param.has('year') && (newParam += '&year=' + +param.get('year'));
        return newParam;
      })
    ).subscribe(param => {
      this._param = param;
      this._service.findAllMoviesByType(undefined, undefined, this._param);
    });
  }

  onSearch(value: string) {
    this.value = value;
    !value && this._service.findAllMoviesByType(undefined, undefined, this._param);
  }

  findMovies() {
    this._type = '';
    this._service.findAllMoviesByValue(this.value, 1, this._param);
  }

  selectSegment(el) {
    // this._loaderService.loaderStart();
    this._type = el.target.value;
    this._service.findAllMoviesByType(el.target.value, undefined, this._param);
  }

  onClickMovie(id: number) {
    console.log(id);
  }

  clickScroll() {
    this.content.scrollToTop(1000);
  }

  more(page: number) {
    const newPage = page + 1;
    this._value && this._service.findMoreMoviesByValue(this._value, newPage, this._param);
    !this._value && this._service.findMoreMoviesByType(this._type, newPage, this._param);
  }

}
