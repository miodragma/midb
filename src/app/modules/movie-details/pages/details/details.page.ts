import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  templateUrl: 'details.page.html',
  styleUrls: [ 'details.page.scss' ]
})
export class DetailsPage implements OnInit {

  constructor(private _loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this._loadingCtrl.create()
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => loadingEl.dismiss(), 500);
      });
  }

  onPopover(events) {
    console.log(events);
  }
}
