import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SimilarListView } from './views/similar-list/similar-list.view';
import { ImageLoaderModule } from '../image-loader/image-loader.module';
import { ImageModalModule } from '../image-modal/image-modal.module';

const pages = [];

const views = [ SimilarListView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  ImageLoaderModule,
  ImageModalModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class SimilarModule {
}
