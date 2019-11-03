import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { GenresService } from '../../shared/services/genres.service';
import { FilterGenre } from '../interfaces/filter-genre.interface';
import { FilterYear } from '../interfaces/filter-year.interface';
import { MovieResponse } from '../../shared/interfaces/movies/movie-response.interface';
import { Actor } from '../../shared/interfaces/actors/actor.interface';
import { FilterService } from '../services/filter.service';
import { IonContent } from '@ionic/angular';
import { TabsService } from '../../tabs/services/tabs.service';

@Component({
  templateUrl: 'filter.page.html',
  styleUrls: [ 'filter.page.scss' ]
})
export class FilterPage implements OnInit {

  tab: string;
  private _value = '';

  isGenres = false;
  isYears = false;
  isActors = true;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  genres$: Observable<FilterGenre[]>;
  years$: Observable<FilterYear[]>;
  actors$: Observable<MovieResponse<Actor>>;
  actor$: Observable<Actor>;

  filterQueryMovie = { with_genres: [], with_cast: undefined, primary_release_year: undefined };
  filterQueryTVShows = { with_genres: [], first_air_date_year: undefined };

  subscription: Subscription;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _genresService: GenresService,
    private _filterService: FilterService,
    private _tabsService: TabsService) {
  }

  ngOnInit() {
    this.subscription = this._tabsService.tabClicked
      .subscribe(tab => this.resetFilter(tab));
    this.subscription = this._route.queryParamMap
      .pipe(
        filter(qParams => !!qParams.has('tab')),
        map(qParam => qParam.get('tab')),
        tap(param => {
          if (param === 'tv-shows') {
            this.genres$ = this._genresService.filterTVShowsGenresList;
            this.years$ = this._genresService.filterTVShowsYearsList;
          } else {
            this.years$ = this._genresService.filterMovieYearsList;
            this.genres$ = this._genresService.filterMoviesGenresList;
            this.actors$ = this._filterService.findActorsList;
            this.actor$ = this._filterService.singleActor;
          }
        })
      ).subscribe(queryParam => this.tab = queryParam);
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

  checkGenre(genre: FilterGenre) {
    this._genresService.updateFilterGenres(this.tab, genre);
    if (this.tab === 'tv-shows') {
      genre.isChecked && this.filterQueryTVShows.with_genres.push(genre.id);
      !genre.isChecked && (this.filterQueryTVShows.with_genres = this.filterQueryTVShows.with_genres.filter(genres => genres !== genre.id));
    } else {
      genre.isChecked && this.filterQueryMovie.with_genres.push(genre.id);
      !genre.isChecked && (this.filterQueryMovie.with_genres = this.filterQueryMovie.with_genres.filter(genres => genres !== genre.id));
    }
  }


  checkYear(year: FilterYear) {
    this._genresService.updateFilterYears(this.tab, year);
    if (this.tab === 'tv-shows') {
      this.filterQueryTVShows.first_air_date_year = year.value;
    } else {
      this.filterQueryMovie.primary_release_year = year.value;
    }
  }

  onSearch(value: string) {
    this._value = value;
    value && this._filterService.findAllActors(value, 1);
    value === '' && this._filterService.removeActorsFromList();
  }

  checkActor(actor: Actor) {
    this._filterService.updateFilterActor(actor);
    this.filterQueryMovie.with_cast = `${actor.id}`;
  }

  more(page: number) {
    const newPage = page + 1;
    this._filterService.findMoreActorsByValue(this._value, newPage);
  }

  clickScroll() {
    this.content.scrollToTop(1000);
  }

  resetFilter(tab) {
    const currTab = tab === 'none' ? this.tab : tab;
    this._genresService.resetGenreAndYearFilter(currTab);
    if (currTab === 'tv-shows') {
      this.filterQueryTVShows = { with_genres: [], first_air_date_year: undefined };
    } else {
      this.filterQueryMovie = { with_genres: [], with_cast: undefined, primary_release_year: undefined };
    }
    this._filterService.resetSingleActor();
  }

  navigate() {
    let updateFilterQuery = {};
    if (this.tab === 'tv-shows') {
      updateFilterQuery = Object.assign({ ...this.filterQueryTVShows }, {
        with_genres: this.filterQueryTVShows.with_genres.length ? this.filterQueryTVShows.with_genres.join(',') : undefined
      });
    } else {
      updateFilterQuery = Object.assign({ ...this.filterQueryMovie }, {
        with_genres: this.filterQueryMovie.with_genres.length ? this.filterQueryMovie.with_genres.join(',') : undefined
      });
    }
    this.isYears = false;
    this.isGenres = false;
    this._router.navigate([ `/tabs/tab/${this.tab}` ], { queryParams: updateFilterQuery });
  }

  isResults(tab, id, filterQueryMovie, filterQueryTVShows) {
    return (tab !== 'tv-shows' && id !== 0)
      || (tab === 'movies' && filterQueryMovie.with_genres.length > 0)
      || (tab === 'tv-shows' && filterQueryTVShows.with_genres.length > 0)
      || (tab === 'movies' && filterQueryMovie.primary_release_year)
      || (tab === 'tv-shows' && filterQueryTVShows.first_air_date_year);
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
