import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImagesListView } from './views/images-list/images-list.view';
import { ImageLoaderModule } from '../image-loader/image-loader.module';
import { ImageModalModule } from '../image-modal/image-modal.module';
import { TranslateModule } from '@ngx-translate/core';

const pages = [];

const views = [ ImagesListView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  ImageLoaderModule,
  ImageModalModule,
  TranslateModule.forChild()
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class ImagesListModule {
}
