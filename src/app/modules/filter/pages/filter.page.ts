import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GenresService } from '../../shared/services/genres.service';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { Actor } from '../../shared/interfaces/actors/actor.interface';
import { FilterService } from '../services/filter.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Genre } from '../../shared/interfaces/genres/genre.interface';
import { HelperService } from '../../shared/services/helper.service';

@Component({
  templateUrl: 'filter.page.html',
  styleUrls: [ 'filter.page.scss' ]
})
export class FilterPage implements OnInit {

  tab: string;
  private _value = '';

  form: FormGroup = this._formDefinition;

  isGenres = false;
  isYears = false;
  isActors = true;

  genres$: Observable<{ genres: Genre[] }>;
  years: number[];
  actors$: Observable<MovieResponse<Actor>>;
  actor$: Observable<Actor>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _genresService: GenresService,
    private _filterService: FilterService,
    private _navCtrl: NavController,
    private _formBuilder: FormBuilder,
    private _helperService: HelperService) {
  }

  get val() {
    return this._value;
  }

  ngOnInit() {
    this._route.queryParamMap
      .pipe(
        filter((params: Params) => !!params.has('tab')),
        tap(params => {
          this.onResetWithGenres();
          this.onResetYear();

          this.years = this._genresService.filterYearsList;

          if (params.get('tab') === 'tv-shows') {
            this._genresService.findAllTVGenres();
            this.genres$ = this._genresService.genresTvList;
            params.has('first_air_date_year') && this.form.get('year').patchValue(+params.get('first_air_date_year'));
            params.has('with_cast') && this.onResetWithCast();
          } else if (params.get('tab') === 'movies') {
            this._genresService.findAllMovieGenres();
            this.genres$ = this._genresService.genresList;
            this.actor$ = this._filterService.singleActor;
            params.has('primary_release_year') && this.form.get('year').patchValue(+params.get('primary_release_year'));
            params.has('with_cast') && this.form.get('with_cast').patchValue(+params.get('with_cast'));
          }
          params.has('with_genres') && this.form.get('with_genres').patchValue(params.get('with_genres').split(',').map(Number));
        })
      ).subscribe(params => this.tab = params.get('tab'));
  }

  private get _formDefinition() {
    return this._formBuilder.group({
      year: [ null ],
      with_genres: [ [] ],
      with_cast: [ null ]
    });
  }

  openGenres() {
    this.isGenres = !this.isGenres;
  }

  openYears() {
    this.isYears = !this.isYears;
  }

  openActors() {
    this.isActors = !this.isActors;
  }

  trackByFn(index, item) {
    return item.value;
  }

  get formGenres() {
    return this.form.get('with_genres');
  }

  get formYear() {
    return this.form.get('year');
  }

  get formWithCast() {
    return this.form.get('with_cast');
  }

  get currFormGenres(): Observable<Genre[]> {
    return this.genres$
      .pipe(
        filter(genres => genres.genres.length > 0 && this.formGenres.value.length > 0),
        map(genres => genres.genres.filter(genre => this.formGenres.value.some(genreId => genreId === genre.id)))
      );
  }

  checkGenre(genre: Genre) {
    if (!this.formGenres.value.some(genreId => genreId === genre.id)) {
      this.formGenres.value.push(genre.id);
    } else {
      this.formGenres.patchValue(this.formGenres.value.filter(genreId => genreId !== genre.id));
    }
  }

  onSearch(value: string) {
    this._value = value;
    if (value) {
      this.actors$ = this._filterService.findAllActors(value, 1);
    } else {
      this.actors$ = of<MovieResponse<Actor>>();
    }
  }

  checkActor(actor: Actor) {
    this.form.get('with_cast').patchValue(actor.id);
    this._filterService.updateFilterActor(actor);
  }

  more(page: number) {
    const newPage = page + 1;
    this.actors$ = this._filterService.findMoreActorsByValue(this._value, newPage);
  }

  applyFilter() {
    this.isYears = false;
    this.isGenres = false;

    const newMap = new Map();
    const form = this.form.value;

    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        form[key] && key === 'with_genres' && form[key].length > 0 && newMap.set(key, form[key]);
        form[key] && key === 'with_cast' && newMap.set(key, form[key]);
        form[key] && key === 'year' && this.tab === 'movies' && newMap.set('primary_release_year', form[key]);
        form[key] && key === 'year' && this.tab === 'tv-shows' && newMap.set('first_air_date_year', form[key]);
      }
    }
    this._helperService.mapToQueryString(newMap) && newMap.set('page', 1);
    const queryParams = this._helperService.mapToQueryString(newMap);
    this._router.navigateByUrl(`/tabs/tab/${this.tab}${queryParams}`);
  }

  onResetYear() {
    this.form.get('year').reset();
  }

  onResetWithCast() {
    this.form.get('with_cast').reset();
    this._filterService.resetSingleActor();
  }

  onResetWithGenres() {
    this.form.get('with_genres').setValue([]);
  }

  navigate() {
    this.applyFilter();
    // this._navCtrl.back();
  }

}
