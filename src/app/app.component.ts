import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoaderService } from './modules/shared/services/loader.service';
import { GenresService } from './modules/shared/services/genres.service';
import { SlidesMovieService } from './modules/movies/services/slides-movie.service';
import { SlidesTvShowService } from './modules/tv-shows/services/slides-tv-show.service';

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
    private _slidesMovieService: SlidesMovieService,
    private _slidesTvShowsService: SlidesTvShowService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this._loaderService.loaderStart();
      this._slidesMovieService.findAllMovieTrendings();
      this._slidesTvShowsService.findAllTvShowTrendings();
      this._genresService.findAllMovieGenres();

    });
  }
}
