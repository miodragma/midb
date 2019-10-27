import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImagesListView } from './views/images-list/images-list.view';

const pages = [];

const views = [ ImagesListView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class ImagesListModule {
}
