import { DetailsData } from '../../interfaces/details-data.interface';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { filter, tap } from 'rxjs/operators';

export class DetailsDataPage<T, S extends DetailsData<T>> {

  constructor(
    protected service: S,
    protected route: ActivatedRoute,
    protected loadingCtrl: LoadingController
  ) {
  }

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
                });
            });
        })
      )
      .subscribe();
  }

}
