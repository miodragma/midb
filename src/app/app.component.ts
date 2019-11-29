import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LoaderService } from './modules/shared/services/loader.service';
import { GenresService } from './modules/shared/services/genres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _alertCtrl: AlertController,
    private _router: Router,
    private _loaderService: LoaderService,
    private _genresService: GenresService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._genresService.findAllMovieGenres();
      this._genresService.findAllTVGenres();
    });
  }

}
