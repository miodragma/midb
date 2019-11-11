import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { EpisodesService } from '../../services/episodes.service';
import { Episode } from '../../../shared/interfaces/episodes/episode.interface';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Cast } from '../../../shared/interfaces/credits/cast.interface';
import { Guest } from '../../../shared/interfaces/credits/guest.interface';

@Component({
  templateUrl: 'episode-details.page.html',
  styleUrls: [ 'episode-details.page.scss' ]
})
export class EpisodeDetailsPage {

  episodeDetails: Episode;

  isLoading: Promise<boolean>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _navCtrl: NavController,
    private _episodesService: EpisodesService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _youtube: YoutubeVideoPlayer,
    private _screenOrientation: ScreenOrientation) {
  }

  ionViewWillEnter() {
    this._screenOrientation.lock(this._screenOrientation.ORIENTATIONS.PORTRAIT);
    this._route.paramMap
      .pipe(
        filter(params => !!params.has('showId') && !!params.get('seasonNumber') && !!params.get('episodeNumber')),
        tap(param => {
          this._loadingCtrl.create()
            .then(loadingEl => {
              loadingEl.present();
              this._episodesService.findEpisodeDetailsById(+param.get('showId'), +param.get('seasonNumber'), +param.get('episodeNumber'))
                .subscribe(data => {
                    this.episodeDetails = data;
                    loadingEl.dismiss();
                    this.isLoading = Promise.resolve(true);
                  },
                  error => {
                    loadingEl.dismiss();
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
                  });
            });
        })
      )
      .subscribe();
  }

  navigateCast(cast: Cast) {
    this._router.navigate([ `/details/celebrities/${cast.id}` ]);
  }

  navigateGuest(guest: Guest) {
    this._router.navigate([ `/details/celebrities/${guest.id}` ]);
  }

  navigate() {
    console.log(this.episodeDetails);
    console.log(`/seasons/${this.episodeDetails.season_number}/${this.episodeDetails.show_id}`);
    // this._router.navigate([`/seasons/${this.episodeDetails.season_number}/${this.episodeDetails.show_id}`]);
  }

  playVideo(id: string) {
    this._youtube.openVideo(id);
  }

}
