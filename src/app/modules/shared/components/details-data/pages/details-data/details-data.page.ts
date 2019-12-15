import { DetailsData } from '../../interfaces/details-data.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export class DetailsDataPage<T, S extends DetailsData<T>> {

  constructor(
    protected service: S,
    protected route: ActivatedRoute,
    protected loadingCtrl: LoadingController,
    protected alertCtrl: AlertController,
    protected router: Router,
    protected translate: TranslateService
  ) {
  }

  isLoading: Promise<boolean>;

  details: T;

  anErrorOccurred = '';
  couldNotLoadDetails = '';
  ok = '';

  private _detailsId = null;

  private _subscription: Subscription;

  initialization() {
    this._subscription = this.route.paramMap
      .pipe(
        filter(params => !!params.has('id')),
        tap(params => {
          this.loadingCtrl.create()
            .then(loadingEl => {
              loadingEl.present();
              this._detailsId = +params.get('id');
              this.service.findDetailsById(+params.get('id'))
                .subscribe(data => {
                    this.details = data;
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
    this.translate.get('labels.an_error_occurred!').subscribe(text => this.anErrorOccurred = text);
    this.translate.get('labels.could_not_load_details.').subscribe(text => this.couldNotLoadDetails = text);
    this.translate.get('labels.ok').subscribe(text => this.ok = text);
  }

  forceReload(refresher) {
    this.service.findDetailsById(this._detailsId, refresher)
      .subscribe(data => {
        this.details = data;
        refresher.target.complete();
      }, error => this.createAlert());
  }

  createAlert() {
    this.alertCtrl
      .create({
        header: this.anErrorOccurred,
        message: this.couldNotLoadDetails,
        buttons: [
          {
            text: this.ok,
            handler: () => {
              this.router.navigate([ '/tabs/tab/movies' ]);
            }
          }
        ]
      })
      .then(alertEl => alertEl.present());
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

  ionViewWillLeave() {
    this._subscription.unsubscribe();
  }

}
