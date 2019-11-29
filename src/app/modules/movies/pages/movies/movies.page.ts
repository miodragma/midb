import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, NavController, Platform, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
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

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage extends ListDataPage<Movie, MoviesService> implements OnInit, OnDestroy {

  movieGenres$: Observable<{ genres: Genre[] }>;

  constructor(
    service: MoviesService,
    route: ActivatedRoute,
    loaderService: LoaderService,
    router: Router,
    private _genresService: GenresService,
    private _navCtrl: NavController,
    private _routerOutlet: IonRouterOutlet,
    private _platform: Platform,
    private _slidesService: SlidesService,
    private _oneSignal: OneSignal,
    private _nativeStorage: NativeStorage,
    private _movieDetailsService: DetailsService,
    private _toastCtrl: ToastController,
    private _adMob: AdMobPro,
    private _router: Router) {
    super(service, route, loaderService, router);
  }

  ngOnInit() {
    this._oneSignal.startInit('bce27de4-a26d-4b6e-99e8-f886fef33422', '347399723166');
    this._oneSignal.inFocusDisplaying(this._oneSignal.OSInFocusDisplayOption.None);

    this._oneSignal.handleNotificationReceived().subscribe(data => {
      // make something
      // const msg = data.payload.body;
      // const title = data.payload.title;
      // const additionalData = data.payload.additionalData;
      // this.showAlert(title, msg, additionalData);
    });

    this._oneSignal.handleNotificationOpened().subscribe(data => {
      const movieId = data.notification.payload.additionalData.movieId;
      const path = data.notification.payload.additionalData.path;
      data.action.actionID === 'open-movie' &&
      setTimeout(() => this._router.navigate([ `details/${path}/${movieId}` ]), 2000);
      data.action.actionID === 'add-to-watchlist' && this.onAddToWatchList(movieId);
    });

    this._oneSignal.endInit();
  }

  ionViewWillEnter() {
    const adMboIds = {
      banner: 'ca-app-pub-2221766326187811~2261858145',
      interstitial: 'ca-app-pub-2221766326187811/5542627609'
    };
    this._adMob.createBanner({
      // adId: adMboIds.banner,
      isTesting: true,
      autoShow: true,
      position: this._adMob.AD_POSITION.BOTTOM_CENTER
    });
    this._adMob.prepareInterstitial({
      // adId: adMboIds.interstitial,
      isTesting: true,
      autoShow: false
    });
    this._navCtrl.setTopOutlet(this._routerOutlet);
    this.subscription = this._platform.backButton.subscribe(() => {
      let currentUrl = this.router.url;
      currentUrl = currentUrl.split('?', currentUrl.length)[0];
      if (currentUrl === '/tabs/tab/movies' || currentUrl === '/tabs/tab/tv-shows' || currentUrl === '/tabs/tab/celebrities') {
        this._adMob.showInterstitial();
        this._adMob.onAdDismiss()
          .subscribe(t => {
            navigator['app'].exitApp();
          });
      } else {
        this._navCtrl.back();
      }
    });
    this.initialization();
    this.movieGenres$ = this._genresService.genresList;
  }

  onAddToWatchList(movieId) {
    this._movieDetailsService.findDetailsById(movieId)
      .subscribe(data => {
        const movie = new Watchlist(
          data.id, data.original_title, data.poster_path, data.omdbDetails.Genre, data.omdbDetails.Released, data.omdbDetails.Actors
        );
        let currWatchlist = { watchlist: [], reminder: [] };
        this._nativeStorage.keys().then(resKeys => {
          if (resKeys[0] === 'movies') {
            this._nativeStorage.getItem('movies')
              .then(res => {
                currWatchlist = res;
                if (currWatchlist.watchlist.some(item => item.id === movie.id)) {
                  this.onShowToast(`${movie.title} is already in Watchlist!`);
                } else {
                  currWatchlist.watchlist.push(movie);
                  this._nativeStorage.setItem('movies', currWatchlist).then(ress => {
                    this.onShowToast(`${movie.title} has been added to Watchlist!`);
                  });
                }
              });
          } else {
            this._nativeStorage.setItem('movies', { watchlist: [ movie ], reminder: [] }).then(res => {
              this.onShowToast(`${movie.title} has been added to Watchlist!`);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
