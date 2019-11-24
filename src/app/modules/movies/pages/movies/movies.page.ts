import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { GenresService } from '../../../shared/services/genres.service';
import { Movie } from '../../../shared/interfaces/movies/movie.interface';
import { ListDataPage } from '../../../shared/components/list-data/pages/list-data/list-data.page';
import { Genre } from '../../../shared/interfaces/genres/genre.interface';
import { SlidesService } from '../../../shared/services/slides.service';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage extends ListDataPage<Movie, MoviesService> implements OnDestroy {

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
    private _adMob: AdMobPro) {
    super(service, route, loaderService, router);
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

  onClickMovie(id: number) {
    this.router.navigate([ `details/movie/${id}` ]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
