import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { CelebrityResponse } from '../../interfaces/celebrity-response.interface';
import { CelebritiesDetailsService } from '../../services/celebrities-details.service';
import { CelebrityCast } from '../../interfaces/celebrity-cast.interface';
import { CelebrityCrew } from '../../interfaces/celebrity-crew.interface';
import { ImageModalPage } from '../../../shared/components/image-modal/page/image-modal.page';

@Component({
  templateUrl: 'details.page.html',
  styleUrls: [ 'details.page.scss' ]
})
export class DetailsPage implements OnInit {

  isLoading: Promise<boolean>;

  details: CelebrityResponse;

  celebrityId = null;

  url = 'https://image.tmdb.org/t/p/w200';

  constructor(
    private _route: ActivatedRoute,
    private _loadingCtrl: LoadingController,
    private _service: CelebritiesDetailsService,
    private _alertCtrl: AlertController,
    private _router: Router,
    private _navCtrl: NavController,
    private _modalCtrl: ModalController
  ) {
  }

  private _subscription: Subscription;

  ngOnInit() {
    this._subscription = this._route.paramMap
      .pipe(
        filter(params => params.has('id')),
        tap(params => {
          this._loadingCtrl.create()
            .then(loadingEl => {
              loadingEl.present();
              this.celebrityId = +params.get('id');
              this._service.findDetailsById(+params.get('id'))
                .subscribe(data => {
                    this.details = data;
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
                              this._router.navigate([ '/tabs/tab/celebrities' ]);
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

  isDetails(details: CelebrityResponse) {
    return details.birthday
      || details.place_of_birth
      || details.deathday
      || details.biography;
  }

  onLoad() {
    // setTimeout(() => this.url = 'https://image.tmdb.org/t/p/original', 2000);
  }

  forceReload(refresher) {
    this._service.findDetailsById(this.celebrityId, refresher)
      .subscribe(data => {
        this.details = data;
        refresher.target.complete();
      });
  }

  openPreview(img) {
    const url = 'https://image.tmdb.org/t/p/original' + img;
    img && this._modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        img: url
      },
    }).then(modal => modal.present());
  }

  getLink(movie) {
    return movie.title ? 'movie' : 'tv-shows';
  }

  filterCastMovies(movies: CelebrityCast[]) {
    return movies.filter(movie => movie.media_type === 'movie' && movie.release_date)
      .sort((a, b) => {
        return Math.floor(new Date(b.release_date).getTime() / 1000.0) - Math.floor(new Date(a.release_date).getTime() / 1000.0);
      });
  }

  filterCastTVShows(movies: CelebrityCast[]) {
    return movies.filter(movie => movie.media_type === 'tv' && movie.first_air_date)
      .sort((a, b) => {
        return Math.floor(new Date(b.first_air_date).getTime() / 1000.0) - Math.floor(new Date(a.first_air_date).getTime() / 1000.0);
      });
  }

  filterCrewMovies(movies: CelebrityCrew[], media: string) {
    return movies.filter(movie => movie.media_type === media);
  }

  trackByCastFn(index, item) {
    return item.poster_path;
  }

  trackByImageFn(index, item) {
    return item.file_path;
  }

  navigate() {
    this._navCtrl.back();
  }

  ionViewWillLeave() {
    this._subscription.unsubscribe();
  }


}
