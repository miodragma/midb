import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InfoView } from './views/info/info.view';
import { PipesModule } from '../../pipes/pipes.module';
import { ImageLoaderModule } from '../image-loader/image-loader.module';

const pages = [];

const views = [ InfoView ];

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
  providers: [ ...services ],
  exports: [ ...views, PipesModule ]
})
export class InfoModule {
}
