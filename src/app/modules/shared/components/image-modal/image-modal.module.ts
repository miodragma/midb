import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImageModalPage } from './page/image-modal.page';
import { IonicSwipeAllModule } from 'ionic-swipe-all';

const pages = [ ImageModalPage ];

const views = [];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  IonicSwipeAllModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views, ...pages ],
  providers: [ ...services ],
  entryComponents: [ ImageModalPage ]
})
export class ImageModalModule {
}
