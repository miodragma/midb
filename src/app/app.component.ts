import { Component } from '@angular/core';

import { AlertController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LoaderService } from './modules/shared/services/loader.service';
import { GenresService } from './modules/shared/services/genres.service';
import { Router } from '@angular/router';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { Subscription } from 'rxjs';
import { CacheService } from 'ionic-cache';
import { LanguageService } from './modules/shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ]
})
export class AppComponent {

  private _subscription: Subscription;

  year = new Date().getFullYear();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _cache: CacheService,
    private _alertCtrl: AlertController,
    private _router: Router,
    private _adMob: AdMobPro,
    private _navCtrl: NavController,
    private _loaderService: LoaderService,
    private _genresService: GenresService,
    private _languageService: LanguageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this._languageService.setInitialAppLanguage();
      this._cache.clearExpired();
      this._cache.setDefaultTTL(60 * 60 * 24);
      this._cache.setOfflineInvalidate(false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._genresService.findAllMovieGenres();
      this._genresService.findAllTVGenres();
      const adMboIds = {
        banner: 'ca-app-pub-2221766326187811/3022946486',
        interstitial: 'ca-app-pub-2221766326187811/5542627609'
      };
      this._adMob.createBanner({
        adId: adMboIds.banner,
        isTesting: false,
        autoShow: true,
        position: this._adMob.AD_POSITION.BOTTOM_CENTER
      });
      this._adMob.prepareInterstitial({
        adId: adMboIds.interstitial,
        isTesting: false,
        autoShow: false
      });
      this._subscription = this.platform.backButton.subscribe(() => {
        let currentUrl = this._router.url;
        currentUrl = currentUrl.split('?', currentUrl.length)[0];
        if (currentUrl === '/tabs/tab/movies' || currentUrl === '/tabs/tab/tv-shows' || currentUrl === '/tabs/tab/celebrities') {
          this._adMob.showInterstitial();
          this._adMob.onAdDismiss()
            .subscribe(t => {
              this._subscription.unsubscribe();
              navigator['app'].exitApp();
            });
        } else {
          this._navCtrl.back();
        }
      });
    });
  }

}
