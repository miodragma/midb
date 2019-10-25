import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';
import { VideosListView } from './views/videos-list/videos-list.view';

const pages = [];

const views = [ VideosListView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  PipesModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class VideosListModule {
}
