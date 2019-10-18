import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { GenresService } from '../../../shared/services/genres.service';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { ListDataPage } from '../../../shared/components/list-data/pages/list-data/list-data.page';
import { Observable } from 'rxjs';
import { Genre } from '../../../shared/interfaces/genre.interface';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage extends ListDataPage<Movie, MoviesService> implements OnInit {

  movieGenres$: Observable<{ genres: Genre[] }>;

  constructor(
    service: MoviesService,
    route: ActivatedRoute,
    loaderService: LoaderService,
    private _genresService: GenresService) {
    super(service, route, loaderService);
  }

  ngOnInit() {
    this.movieGenres$ = this._genresService.genresList;
    super.ngOnInit();
  }
}
