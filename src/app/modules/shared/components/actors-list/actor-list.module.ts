import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActorListView } from './views/actor-list.view';
import { ImageLoaderModule } from '../image-loader/image-loader.module';

const pages = [];

const views = [ ActorListView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  ImageLoaderModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class ActorListModule {
}
