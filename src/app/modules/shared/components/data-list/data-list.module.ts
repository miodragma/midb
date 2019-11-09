import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DataListView } from './views/data-list.view';
import { PipesModule } from '../../pipes/pipes.module';
import { ImageLoaderModule } from '../image-loader/image-loader.module';

const pages = [];

const views = [ DataListView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  PipesModule,
  ImageLoaderModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class DataListModule {
}
