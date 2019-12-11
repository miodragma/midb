import { DetailsData } from '../../interfaces/details-data.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export class DetailsDataPage<T, S extends DetailsData<T>> {

  constructor(
    protected service: S,
    protected route: ActivatedRoute,
    protected loadingCtrl: LoadingController,
    protected alertCtrl: AlertController,
    protected router: Router
  ) {
  }

  isLoading: Promise<boolean>;

  details: T;

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
        header: 'An error occurred!',
        message: 'Could not load details.',
        buttons: [
          {
            text: 'Ok',
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
