import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { GenresService } from '../../../shared/services/genres.service';
import { Movie } from '../../../shared/interfaces/movies/movie.interface';
import { ListDataPage } from '../../../shared/components/list-data/pages/list-data/list-data.page';
import { Genre } from '../../../shared/interfaces/genres/genre.interface';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage extends ListDataPage<Movie, MoviesService> {

  movieGenres$: Observable<{ genres: Genre[] }>;
  math = Math;

  constructor(
    service: MoviesService,
    route: ActivatedRoute,
    loaderService: LoaderService,
    private _genresService: GenresService,
    private _router: Router,
    private _navCtrl: NavController,
    private _routerOutlet: IonRouterOutlet,
    private _platform: Platform) {
    super(service, route, loaderService);
    service.findAllMovieTrendings();
  }

  ionViewWillEnter() {
    this._navCtrl.setTopOutlet(this._routerOutlet);
    this.subscription = this._platform.backButton.subscribe(() => {
      if (this._routerOutlet && this._routerOutlet.canGoBack()) {
        this._routerOutlet.pop();
      } else if (this._router.url !== '/tabs/tab/movies') {
        this._router.navigate([ '/tabs/tab/movies' ]);
      } else {
        navigator['app'].exitApp();
      }
    });
    this.initialization();
    this.movieGenres$ = this._genresService.genresList;
  }

  onClickMovie(id: number) {
    this._router.navigate([ `details/movie/${id}` ]);
  }

}
