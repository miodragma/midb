import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { DetailsService } from '../../services/details.service';
import { DetailsDataPage } from '../../../shared/components/details-data/pages/details-data/details-data.page';
import { MovieDetails } from '../../../shared/interfaces/movies/details/movie-details.interface';
import { PopoverListView } from '../../../shared/components/popover-list/views/popover-list/popover-list.view';

@Component({
  templateUrl: 'details.page.html',
  styleUrls: [ 'details.page.scss' ]
})
export class DetailsPage extends DetailsDataPage<MovieDetails, DetailsService> implements OnInit, OnDestroy {

  constructor(
    service: DetailsService,
    route: ActivatedRoute,
    loadingCtrl: LoadingController,
    alertCtrl: AlertController,
    router: Router,
    private _screenOrientation: ScreenOrientation,
    private _youtube: YoutubeVideoPlayer,
    private _popoverCtrl: PopoverController) {
    super(service, route, loadingCtrl, alertCtrl, router);
  }

  ngOnInit() {
    this._screenOrientation.lock(this._screenOrientation.ORIENTATIONS.PORTRAIT);
    this.initialization();
  }

  onPopover(events) {
    this._popoverCtrl.create({
      component: PopoverListView,
      event: events,
      componentProps: { movie: this.details, popoverController: this._popoverCtrl }
    }).then(popEl => {
      popEl.present();
    });
  }

  playVideo(id: string) {
    this._youtube.openVideo(id);
  }

  ngOnDestroy() {
    this._screenOrientation.unlock();
  }

}
