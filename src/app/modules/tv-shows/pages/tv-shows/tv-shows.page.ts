import { Component } from '@angular/core';
import { ListDataPage } from '../../../shared/components/list-data/pages/list-data/list-data.page';
import { GenresService } from '../../../shared/services/genres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';
import { TvShowService } from '../../services/tv-show.service';
import { Observable } from 'rxjs';
import { Genre } from '../../../shared/interfaces/genres/genre.interface';
import { TvShow } from '../../interfaces/tv-show.interface';

@Component({
  templateUrl: 'tv-shows.page.html',
  styleUrls: [ 'tv-shows.page.scss' ]
})
export class TvShowsPage extends ListDataPage<TvShow, TvShowService> {

  tvGenres$: Observable<{ genres: Genre[] }>;

  constructor(
    service: TvShowService,
    route: ActivatedRoute,
    loaderService: LoaderService,
    router: Router,
    private _genresService: GenresService,) {
    super(service, route, loaderService, router);
    service.findAllMovieTrendings();
  }

  ionViewWillEnter() {
    this.initialization();
    this.tvGenres$ = this._genresService.genresTvList;
  }

  onClickTvShow(id: number) {
    this.router.navigate([ `details/tv-shows/${id}` ]);
  }

}
