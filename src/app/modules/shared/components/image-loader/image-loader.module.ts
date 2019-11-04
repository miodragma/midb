import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';
import { ImageLoaderView } from './views/image-loader.view';

const pages = [];

const views = [ ImageLoaderView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ],
  exports: [ ...views, PipesModule ]
})
export class ImageLoaderModule {
}
