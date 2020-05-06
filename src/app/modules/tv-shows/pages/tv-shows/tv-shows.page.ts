import { Component, OnInit } from '@angular/core';
import { ListDataPage } from '../../../shared/components/list-data/pages/list-data/list-data.page';
import { GenresService } from '../../../shared/services/genres.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';
import { TvShowService } from '../../services/tv-show.service';
import { Observable } from 'rxjs';
import { Genre } from '../../../shared/interfaces/genres/genre.interface';
import { TvShow } from '../../interfaces/tv-show.interface';
import { SlidesService } from '../../../shared/services/slides.service';
import { Filter } from '../../../filter/interfaces/filter-params.interface';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: 'tv-shows.page.html',
  styleUrls: [ 'tv-shows.page.scss' ]
})
export class TvShowsPage extends ListDataPage<TvShow, TvShowService> implements OnInit {

  tvGenres$: Observable<{ genres: Genre[] }>;
  queryParams: Observable<Filter>;

  constructor(
    service: TvShowService,
    route: ActivatedRoute,
    loaderService: LoaderService,
    router: Router,
    private _genresService: GenresService,
    private _slidesService: SlidesService) {
    super(service, route, loaderService, router);
  }

  ngOnInit() {
    this.queryParams = this.route.queryParamMap
      .pipe(
        map((params: Params) => Object.assign({}, params.params, { tab: 'tv-shows' }))
      );
  }

  ionViewWillEnter() {
    this.initialization();
    this.tvGenres$ = this._genresService.genresTvList;
  }

  onClickTvShow(id: number) {
    this.router.navigate([ `details/tv-shows/${id}` ]);
  }

}
