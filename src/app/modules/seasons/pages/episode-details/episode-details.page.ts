import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { EpisodesService } from '../../services/episodes.service';
import { Episode } from '../../../shared/interfaces/episodes/episode.interface';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Cast } from '../../../shared/interfaces/credits/cast.interface';
import { Guest } from '../../../shared/interfaces/credits/guest.interface';
import { ImageModalPage } from '../../../shared/components/image-modal/page/image-modal.page';

@Component({
  templateUrl: 'episode-details.page.html',
  styleUrls: [ 'episode-details.page.scss' ]
})
export class EpisodeDetailsPage implements OnInit {

  episodeDetails: Episode;

  isLoading: Promise<boolean>;

  private _showId = null;
  private _seasonNumber = null;
  private _episodeNumber = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _navCtrl: NavController,
    private _episodesService: EpisodesService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _youtube: YoutubeVideoPlayer,
    private _screenOrientation: ScreenOrientation,
    private _modalCtrl: ModalController) {
  }

  ngOnInit() {
    // this._screenOrientation.lock(this._screenOrientation.ORIENTATIONS.PORTRAIT);
    this._route.paramMap
      .pipe(
        filter(params => !!params.has('showId') && !!params.get('seasonNumber') && !!params.get('episodeNumber')),
        tap(param => {
          this._loadingCtrl.create()
            .then(loadingEl => {
              loadingEl.present();
              this._showId = +param.get('showId');
              this._seasonNumber = +param.get('seasonNumber');
              this._episodeNumber = +param.get('episodeNumber');
              this._episodesService.findEpisodeDetailsById(+param.get('showId'), +param.get('seasonNumber'), +param.get('episodeNumber'))
                .subscribe(data => {
                    this.episodeDetails = data;
                    loadingEl.dismiss();
                    this.isLoading = Promise.resolve(true);
                  },
                  error => {
                    loadingEl.dismiss();
                    this.createAlert();
                  });
            });
        })
      )
      .subscribe();
  }

  trackByFn(index, item) {
    return item.file_path;
  }

  forceReload(refresher) {
    this._episodesService.findEpisodeDetailsById(this._showId, this._seasonNumber, this._episodeNumber, refresher)
      .subscribe(data => {
          this.episodeDetails = data;
          refresher.target.complete();
        },
        error => this.createAlert());
  }

  createAlert() {
    this._alertCtrl
      .create({
        header: 'An error occurred!',
        message: 'Could not load details.',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this._navCtrl.back();
            }
          }
        ]
      })
      .then(alertEl => alertEl.present());
  }

  openPreview(img) {
    this._modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        img
      },
    }).then(modal => modal.present());
  }

  isDetails(details) {
    return details.release_date
      || details.first_air_date
      || details.production_countries
      || details.origin_country
      || details.omdbDetails.Language
      || details.budget
      || details.revenue
      || details.omdbDetails.Production
      || details.production_companies.length > 0;
  }

  navigateCast(cast: Cast) {
    this._router.navigate([ `/details/celebrities/${cast.id}` ]);
  }

  navigateGuest(guest: Guest) {
    this._router.navigate([ `/details/celebrities/${guest.id}` ]);
  }

  navigate() {
    this._navCtrl.back();
  }

  playVideo(id: string) {
    this._youtube.openVideo(id);
  }

}
