import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { MoviesService } from '../../services/movies.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { GenresService } from '../../../shared/services/genres.service';
import { SlidesService } from '../../../shared/services/slides.service';

import { ListDataPage } from '../../../shared/components/list-data/pages/list-data/list-data.page';

import { Movie } from '../../../shared/interfaces/movies/movie.interface';
import { Genre } from '../../../shared/interfaces/genres/genre.interface';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DetailsService } from '../../../movie-details/services/details.service';
import { Watchlist } from '../../../watchlist/models/watchlist.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage extends ListDataPage<Movie, MoviesService> implements OnInit {

  movieGenres$: Observable<{ genres: Genre[] }>;

  isAlreadyInWatchlist = '';
  hasBeenAddedToWatchlist = '';

  constructor(
    service: MoviesService,
    route: ActivatedRoute,
    loaderService: LoaderService,
    router: Router,
    private _genresService: GenresService,
    private _platform: Platform,
    private _slidesService: SlidesService,
    private _oneSignal: OneSignal,
    private _nativeStorage: NativeStorage,
    private _movieDetailsService: DetailsService,
    private _toastCtrl: ToastController,
    private _router: Router,
    private _translate: TranslateService) {
    super(service, route, loaderService, router);
  }

  ngOnInit() {
    this._oneSignal.startInit('bce27de4-a26d-4b6e-99e8-f886fef33422', '347399723166');
    this._oneSignal.inFocusDisplaying(this._oneSignal.OSInFocusDisplayOption.None);

    this._oneSignal.handleNotificationReceived().subscribe(data => {
    });

    this._oneSignal.handleNotificationOpened().subscribe(data => {
      const movieId = data.notification.payload.additionalData.movieId;
      const path = data.notification.payload.additionalData.path;
      data.action.actionID === 'open-movie' &&
      setTimeout(() => this._router.navigate([ `details/${path}/${movieId}` ]), 2000);
      data.action.actionID === 'add-to-watchlist' && this.onAddToWatchList(movieId);
    });

    this._oneSignal.endInit();

    this._translate.get('labels.is_already_in_watchlist!').subscribe(text => this.isAlreadyInWatchlist = text);
    this._translate.get('labels.has_been_added_to_watchlist!').subscribe(text => this.hasBeenAddedToWatchlist! = text);
  }

  ionViewWillEnter() {
    this.initialization();
    this.movieGenres$ = this._genresService.genresList;
  }

  onAddToWatchList(movieId) {
    this._movieDetailsService.findDetailsById(movieId)
      .subscribe(data => {
        const movie = new Watchlist(
          data.id, data.title, data.name, data.poster_path, data.omdbDetails.Genre, data.omdbDetails.Released, data.omdbDetails.Actors, 'watchlistMovies'
        );
        let currWatchlist = { watchlistMovies: [], watchlistTvShows: [] };
        this._nativeStorage.keys().then(resKeys => {
          if (resKeys.includes('movies')) {
            this._nativeStorage.getItem('movies')
              .then(res => {
                currWatchlist = res;
                if (currWatchlist.watchlistMovies.some(item => item.id === movie.id)) {
                  this.onShowToast(`${movie.title} ${this.isAlreadyInWatchlist}`);
                } else {
                  currWatchlist.watchlistMovies.push(movie);
                  this._nativeStorage.setItem('movies', currWatchlist).then(ress => {
                    this.onShowToast(`${movie.title} ${this.hasBeenAddedToWatchlist}`);
                  });
                }
              });
          } else {
            this._nativeStorage.setItem('movies', { watchlistMovies: [ movie ], watchlistTvShows: [] }).then(res => {
              this.onShowToast(`${movie.title} ${this.hasBeenAddedToWatchlist}`);
            });
          }
        })
          .catch(error => {
            this.onShowToast(`Error ${error}!`);
          });
      });
  }

  onShowToast(newMessage) {
    this._toastCtrl.create({
      message: newMessage,
      duration: 2000
    })
      .then(toastEl => toastEl.present());
  }

  onClickMovie(id: number) {
    this.router.navigate([ `details/movie/${id}` ]);
  }

}
