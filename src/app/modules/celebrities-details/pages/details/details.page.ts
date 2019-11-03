import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CelebrityResponse } from '../../interfaces/celebrity-response.interface';
import { CelebritiesDetailsService } from '../../services/celebrities-details.service';

@Component({
  templateUrl: 'details.page.html',
  styleUrls: [ 'details.page.scss' ]
})
export class DetailsPage implements OnInit {

  isLoading: Promise<boolean>;

  details: CelebrityResponse;

  constructor(
    private _route: ActivatedRoute,
    private _loadingCtrl: LoadingController,
    private _service: CelebritiesDetailsService,
    private _alertCtrl: AlertController,
    private _router: Router
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

  getLink(movie) {
    return movie.title ? 'movie' : 'tv-shows';
  }

  ionViewWillLeave() {
    this._subscription.unsubscribe();
  }


}
