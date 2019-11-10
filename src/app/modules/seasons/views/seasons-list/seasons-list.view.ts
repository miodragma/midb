import { Component, Input, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { SeasonList } from '../../../shared/interfaces/season-list/season-list.interface';

@Component({
  selector: 'seasons-list',
  templateUrl: 'seasons-list.view.html',
  styleUrls: [ 'seasons-list.view.scss' ]
})
export class SeasonsListView {

  @ViewChild('slider', { static: false }) slider: IonSlides;

  @Input() seasonList: SeasonList[];
  @Input() tvShowId: number;

  slideOpts = {
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  };

  counter(i: number) {
    return new Array(i);
  }

  trackByFn(index, item) {
    return item.id;
  }

  onClickSeason(index: number) {
    this.slider.slideTo(index, 500);
  }

}
