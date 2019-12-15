import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';
import { VideosListView } from './views/videos-list/videos-list.view';
import { ImageLoaderModule } from '../image-loader/image-loader.module';
import { TranslateModule } from '@ngx-translate/core';

const pages = [];

const views = [ VideosListView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  PipesModule,
  ImageLoaderModule,
  TranslateModule.forChild()
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class VideosListModule {
}
