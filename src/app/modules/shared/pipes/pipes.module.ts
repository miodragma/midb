import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FindGenres } from './find-genres.pipe';
import { FirstTrailer } from './first-trailer.pipe';

const pages = [];

const views = [];

const services = [];

const pipes = [
  FindGenres,
  FirstTrailer
];

const modules = [
  CommonModule,
  IonicModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views, ...pipes ],
  exports: [ ...pipes ],
  providers: [ ...services ]
})
export class PipesModule {
}
