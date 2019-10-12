import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GenresService } from '../../shared/services/genres.service';
import { FilterGenre } from '../interfaces/filter-genre.interface';
import { FilterYear } from '../interfaces/filter-year.interface';

@Component({
  templateUrl: 'filter.page.html',
  styleUrls: [ 'filter.page.scss' ]
})
export class FilterPage implements OnInit {

  tab: string;

  genres$: Observable<FilterGenre[]>;
  years$: Observable<FilterYear[]>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _genresService: GenresService) {
  }

  ngOnInit() {
    this.years$ = this._genresService.filterYearsList;
    this.genres$ = this._genresService.filterMoviesGenresList;
    this._route.queryParamMap
      .pipe(
        filter(qParams => !!qParams.has('tab')),
        map(qParam => qParam.get('tab'))
      ).subscribe(queryParam => this.tab = queryParam);
  }

  checkGenre(genre) {
    this._genresService.updateFilterGenres(genre);
  }

  checkYear(year) {
    this._genresService.updateFilterYears(year);
  }

  navigate() {
    // this._router.navigate([`/tabs/tab/${this.tab}`], { queryParams: {with_genres: '13,31', with_cast: '231,32132', year: 2016} });
    this._router.navigate([ `/tabs/tab/${this.tab}` ]);
    console.log(this.tab);
    console.log('navigate');
  }

  onSearch(value: string) {
    console.log(value);
  }
}
