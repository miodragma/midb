import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Crew } from '../../../../interfaces/credits/crew.interface';
import { Cast } from '../../../../interfaces/credits/cast.interface';
import { Guest } from '../../../../interfaces/credits/guest.interface';
import { ImageModalPage } from '../../../image-modal/page/image-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'top-actors-list',
  templateUrl: 'top-actors-list.view.html',
  styleUrls: [ 'top-actors-list.view.scss' ]
})
export class TopActorsListView {

  url = 'https://image.tmdb.org/t/p/w200';

  slice = 4;

  sliceGuest = 4;

  @Input() casts: Cast[];
  @Input() crews: Crew[];
  @Input() guests: Guest[];
  @Input() title: string;
  @Output() navigateCast = new EventEmitter<Cast>();
  @Output() navigateGuest = new EventEmitter<Guest>();

  constructor(private _modalCtrl: ModalController) {
  }

  trackByFn(index, item) {
    return item.profile_path;
  }

  onExpand(length) {
    this.slice = length;
  }

  onExpandGuests(length) {
    this.sliceGuest = length;
  }

  openPreview(img) {
    const url = 'https://image.tmdb.org/t/p/original' + img;
    img && this._modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        img: url
      },
    }).then(modal => modal.present());
  }

  onLoad() {
    // setTimeout(() => this.url = 'https://image.tmdb.org/t/p/w92', 2000);
  }

}
