import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlidesMovieView } from './views/slides/slides-movie.view';

const pages = [];

const views = [ SlidesMovieView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [
    SlidesMovieView
  ],
  providers: [ ...services ]
})
export class SlidesModule {
}
