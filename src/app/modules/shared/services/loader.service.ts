import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {

  constructor(private _loadingCtrl: LoadingController) {
  }

  loaderStart() {
    this._loadingCtrl.create()
      .then(loadingEl => loadingEl.present());
  }

  loaderStop() {
    this._loadingCtrl.dismiss();
  }

}
