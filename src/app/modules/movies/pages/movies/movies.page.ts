import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';

import { MoviesService } from '../../services/movies.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { GenresService } from '../../../shared/services/genres.service';
import { SlidesService } from '../../../shared/services/slides.service';

import { ListDataPage } from '../../../shared/components/list-data/pages/list-data/list-data.page';

import { Movie } from '../../../shared/interfaces/movies/movie.interface';
import { Genre } from '../../../shared/interfaces/genres/genre.interface';
import { DetailsService } from '../../../movie-details/services/details.service';
import { Watchlist } from '../../../watchlist/models/watchlist.model';
import { Filter } from '../../../filter/interfaces/filter-params.interface';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage extends ListDataPage<Movie, MoviesService> implements OnInit {

  movieGenres$: Observable<{ genres: Genre[] }>;

  isAlreadyInWatchlist = '';
  hasBeenAddedToWatchlist = '';

  queryParams: Observable<Filter>;

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

    this.queryParams = this.route.queryParamMap
      .pipe(
        map((params: Params) => Object.assign({}, params.params, { tab: 'movies' }))
      );
    this._translate.get('labels.is_already_in_watchlist!').subscribe(text => this.isAlreadyInWatchlist = text);
    this._translate.get('labels.has_been_added_to_watchlist!').subscribe(text => this.hasBeenAddedToWatchlist = text);
    this._oneSignal.startInit('ba2a041f-873c-4c75-9549-8256bdd97d1f', '832714447768');
    this._oneSignal.inFocusDisplaying(this._oneSignal.OSInFocusDisplayOption.Notification);

    this._oneSignal.handleNotificationOpened().subscribe(data => {
      const movieId = data.notification.payload.additionalData.movieId;
      const path = data.notification.payload.additionalData.path;
      const type = data.notification.payload.additionalData.type;
      if (data.action.actionID === 'open-movie') {
        setTimeout(() => this._router.navigate([ `details/${path}/${movieId}` ]), 2000);
      }
      data.action.actionID === 'add-to-watchlist' && this.onAddToWatchList(movieId, type);
    });

    this._oneSignal.endInit();
  }

  ionViewWillEnter() {
    this.initialization();
    this.movieGenres$ = this._genresService.genresList;
    this._genresService.findAllMovieGenres();
    this._genresService.findAllTVGenres();
  }

  onAddToWatchList(movieId, notificationType: string) {
    const type = notificationType === 'watchlistMovies' ?
      this._movieDetailsService.findDetailsById(movieId) :
      this._movieDetailsService.findAllTvDetails(movieId);
    type.subscribe(data => {
      let allGenres = '';
      if (notificationType === 'watchlistMovies') {
        this._genresService.genresList
          .subscribe(serviceGenres => {
            allGenres = serviceGenres.genres.filter(genre => data.genres.some(genreId => genreId.id === genre.id)).map(g => g.name).join(' | ');
          });
      } else {
        this._genresService.genresTvList
          .subscribe(serviceGenres => {
            allGenres = serviceGenres.genres.filter(genre => data.genres.some(genreId => genreId.id === genre.id)).map(g => g.name).join(' | ');
          });
      }

      const movie = new Watchlist(
        data.id, data.title, data.name, data.poster_path, allGenres, data.omdbDetails.Released, data.omdbDetails.Actors, notificationType
      );

      let currWatchlist = { watchlistMovies: [], watchlistTvShows: [] };
      this._nativeStorage.keys().then(resKeys => {
        if (resKeys.includes('movies')) {
          this._nativeStorage.getItem('movies')
            .then(res => {
              currWatchlist = res;
              if (currWatchlist[notificationType].some(item => item.id === movie.id)) {
                const title = notificationType === 'watchlistMovies' ? movie.title : movie.name;
                this._translate.get('labels.is_already_in_watchlist!').subscribe(text => {
                  this.isAlreadyInWatchlist = text;
                  this.onShowToast(`"${title}" ${text}`);
                });
                return;
              } else {
                currWatchlist[notificationType].push(movie);
                this._nativeStorage.setItem('movies', currWatchlist).then(ress => {
                  this.hasBeenAdded(notificationType, movie);
                  return;
                });
              }
            });
        } else {
          const value = notificationType === 'watchlistMovies' ?
            { watchlistMovies: [ movie ], watchlistTvShows: [] } :
            { watchlistMovies: [], watchlistTvShows: [ movie ] };
          this._nativeStorage.setItem('movies', value).then(res => {
            this.hasBeenAdded(notificationType, movie);
            return;
          });
        }
      })
        .catch(error => this.onShowToast(`Error ${error}!`));
    });
    // this._movieDetailsService.findDetailsById(movieId)
    //   .subscribe(data => {
    //
    //     let allGenres = '';
    //
    //     this._genresService.genresList
    //       .subscribe(serviceGenres => {
    //         allGenres = serviceGenres.genres.filter(genre => data.genres.some(genreId => genreId.id === genre.id)).map(g => g.name).join(' | ');
    //       });
    //
    //     const movie = new Watchlist(
    //       data.id, data.title, data.name, data.poster_path, allGenres, data.omdbDetails.Released, data.omdbDetails.Actors, 'watchlistMovies'
    //     );
    //     let currWatchlist = { watchlistMovies: [], watchlistTvShows: [] };
    //     this._nativeStorage.keys().then(resKeys => {
    //       if (resKeys.includes('movies')) {
    //         this._nativeStorage.getItem('movies')
    //           .then(res => {
    //             currWatchlist = res;
    //             if (currWatchlist.watchlistMovies.some(item => item.id === movie.id)) {
    //               this.onShowToast(`"${movie.title}" ${this.isAlreadyInWatchlist}`);
    //             } else {
    //               currWatchlist.watchlistMovies.push(movie);
    //               this._nativeStorage.setItem('movies', currWatchlist).then(ress => {
    //                 this.onShowToast(`"${movie.title}" ${this.hasBeenAddedToWatchlist}`);
    //               });
    //             }
    //           });
    //       } else {
    //         this._nativeStorage.setItem('movies', { watchlistMovies: [ movie ], watchlistTvShows: [] }).then(res => {
    //           this.onShowToast(`"${movie.title}" ${this.hasBeenAddedToWatchlist}`);
    //         });
    //       }
    //     })
    //       .catch(error => {
    //         this.onShowToast(`Error ${error}!`);
    //       });
    //   });
  }

  hasBeenAdded(notificationType, movie) {
    const title = notificationType === 'watchlistMovies' ? movie.title : movie.name;
    this._translate.get('labels.has_been_added_to_watchlist!').subscribe(text => {
      this.hasBeenAddedToWatchlist = text;
      this.onShowToast(`"${title}" ${text}`);
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
