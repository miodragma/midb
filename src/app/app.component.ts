import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoaderService } from './modules/shared/services/loader.service';
import { GenresService } from './modules/shared/services/genres.service';
import { SlidesService } from './modules/movies/services/slides.service';

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
    private _loaderService: LoaderService,
    private _genresService: GenresService,
    private _slidesService: SlidesService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this._loaderService.loaderStart();
      this._slidesService.findAllTrendings();
      this._genresService.findAllMovieGenres();
    });
  }
}
