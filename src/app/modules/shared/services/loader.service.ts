import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {

  isLoading = false;

  constructor(private _loadingCtrl: LoadingController) {
  }

  async present() {
    this.isLoading = true;
    return await this._loadingCtrl.create().then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this._loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  // loaderStart() {
  //   this._loadingCtrl.create().then(loadingEl => loadingEl.present());
  // }
  //
  // loaderStop() {
  //   return this._loadingCtrl.dismiss();
  // }

}
