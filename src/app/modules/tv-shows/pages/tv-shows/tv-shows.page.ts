import { Component, OnInit } from '@angular/core';
import { ListDataPage } from '../../../shared/components/list-data/pages/list-data/list-data.page';
import { GenresService } from '../../../shared/services/genres.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';
import { TvShowService } from '../../services/tv-show.service';
import { Observable } from 'rxjs';
import { Genre } from '../../../shared/interfaces/genre.interface';
import { TvShow } from '../../interfaces/tv-show.interface';

@Component({
  templateUrl: 'tv-shows.page.html',
  styleUrls: [ 'tv-shows.page.scss' ]
})
export class TvShowsPage extends ListDataPage<TvShow, TvShowService> implements OnInit {

  tvGenres$: Observable<{ genres: Genre[] }>;

  constructor(
    service: TvShowService,
    route: ActivatedRoute,
    loaderService: LoaderService,
    private _genresService: GenresService) {
    super(service, route, loaderService);
  }

  ngOnInit() {
    this.initialization();
    this.service.findAllMovieTrendings();
    this.tvGenres$ = this._genresService.genresTvList;
  }

  onClickTvShow(id: number) {
    console.log('tv show', id);
  }

}
