import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  templateUrl: 'image-modal.page.html',
  styleUrls: [ 'image-modal.page.scss' ]
})
export class ImageModalPage implements OnInit {

  img: any;

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  constructor(private _navParams: NavParams, private _modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.img = this._navParams.get('img');
  }

  onSwipeClose(e) {
    this.close();
  }

  close() {
    this._modalCtrl.dismiss();
  }

}
