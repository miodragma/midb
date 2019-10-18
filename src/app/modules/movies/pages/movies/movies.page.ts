import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { GenresService } from '../../../shared/services/genres.service';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { ListDataPage } from '../../../shared/components/list-data/pages/list-data/list-data.page';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage extends ListDataPage<Movie, MoviesService, GenresService> implements OnInit {

  constructor(
    service: MoviesService,
    genresService: GenresService,
    route: ActivatedRoute,
    loaderService: LoaderService) {
    super(service, genresService, route, loaderService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
