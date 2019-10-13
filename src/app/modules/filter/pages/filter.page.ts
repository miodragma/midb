import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GenresService } from '../../shared/services/genres.service';
import { FilterGenre } from '../interfaces/filter-genre.interface';
import { FilterYear } from '../interfaces/filter-year.interface';
import { MovieResponse } from '../../shared/interfaces/movie-response.interface';
import { Actor } from '../../shared/interfaces/actor.interface';
import { FilterService } from '../services/filter.service';
import { IonContent } from '@ionic/angular';

@Component({
  templateUrl: 'filter.page.html',
  styleUrls: [ 'filter.page.scss' ]
})
export class FilterPage implements OnInit {

  tab: string;
  private _value: string;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  genres$: Observable<FilterGenre[]>;
  years$: Observable<FilterYear[]>;
  actors$: Observable<MovieResponse<Actor>>;
  actor$: Observable<Actor>;

  filterQuery = { with_genres: [], with_cast: '', year: undefined };

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _genresService: GenresService,
    private _filterService: FilterService) {
  }

  ngOnInit() {
    this.actors$ = this._filterService.findActorsList;
    this.actor$ = this._filterService.singleActor;
    this.years$ = this._genresService.filterYearsList;
    this.genres$ = this._genresService.filterMoviesGenresList;
    this._route.queryParamMap
      .pipe(
        filter(qParams => !!qParams.has('tab')),
        map(qParam => qParam.get('tab'))
      ).subscribe(queryParam => this.tab = queryParam);
  }

  checkGenre(genre: FilterGenre) {
    this._genresService.updateFilterGenres(genre);
    genre.isChecked && this.filterQuery.with_genres.push(genre.id);
    !genre.isChecked && (this.filterQuery.with_genres = this.filterQuery.with_genres.filter(genres => genres !== genre.id));
  }

  checkYear(year: FilterYear) {
    this._genresService.updateFilterYears(year);
    this.filterQuery.year = year.value;
  }

  onSearch(value: string) {
    this._value = value;
    value && this._filterService.findAllActors(value, 1);
    value === '' && this._filterService.removeActorsFromList();
  }

  checkActor(actor: Actor) {
    this._filterService.updateFilterActor(actor);
    this.filterQuery.with_cast = `${actor.id}`;
  }

  more(page: number) {
    const newPage = page + 1;
    this._filterService.findMoreActorsByValue(this._value, newPage);
  }

  clickScroll() {
    this.content.scrollToTop(1000);
  }

  navigate() {
    const updateFilterQuery = { ...this.filterQuery, with_genres: this.filterQuery.with_genres.join(',') };
    this._router.navigate([ `/tabs/tab/${this.tab}` ], { queryParams: updateFilterQuery });
  }
}
