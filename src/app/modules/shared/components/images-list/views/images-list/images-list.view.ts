import { Component, Input } from '@angular/core';
import { Image } from '../../../../interfaces/images/image.interface';
import { ImageModalPage } from '../../../image-modal/page/image-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'images-list',
  templateUrl: 'images-list.view.html',
  styleUrls: [ 'images-list.view.scss' ]
})
export class ImagesListView {

  @Input() images: Image;
  url = 'https://image.tmdb.org/t/p/w200';


  constructor(private _modalCtrl: ModalController) {
  }

  trackByFn(index, item) {
    return item.file_path;
  }

  onLoad() {
    setTimeout(() => this.url = 'https://image.tmdb.org/t/p/original', 2000);
  }

  openPreview(img) {
    this._modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        img
      },
    }).then(modal => modal.present());
  }

}
