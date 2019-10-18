import { Component, OnInit } from '@angular/core';
import { ListDataPage } from '../../../shared/components/list-data/pages/list-data/list-data.page';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { GenresService } from '../../../shared/services/genres.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';
import { TvShowService } from '../../services/tv-show.service';
import { Observable } from 'rxjs';
import { Genre } from '../../../shared/interfaces/genre.interface';

@Component({
  templateUrl: 'tv-shows.page.html',
  styleUrls: [ 'tv-shows.page.scss' ]
})
export class TvShowsPage extends ListDataPage<Movie, TvShowService> implements OnInit {

  tvGenres$: Observable<{ genres: Genre[] }>;

  constructor(
    service: TvShowService,
    route: ActivatedRoute,
    loaderService: LoaderService,
    private _genresService: GenresService) {
    super(service, route, loaderService);
  }

  ngOnInit() {
    this.tvGenres$ = this._genresService.genresTvList;
    super.ngOnInit();
  }
}
