import { DetailsData } from '../../interfaces/details-data.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { filter, tap } from 'rxjs/operators';

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

  initialization() {
    this.route.paramMap
      .pipe(
        filter(params => params.has('id')),
        tap(params => {
          this.loadingCtrl.create()
            .then(loadingEl => {
              loadingEl.present();
              this.service.findDetailsById(+params.get('id'))
                .subscribe(data => {
                  this.details = data;
                  loadingEl.dismiss();
                  this.isLoading = Promise.resolve(true);
                  },
                  error => {
                    loadingEl.dismiss();
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
                  });
            });
        })
      )
      .subscribe();
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

}
