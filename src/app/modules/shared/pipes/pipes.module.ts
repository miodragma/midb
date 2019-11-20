import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FindGenres } from './find-genres.pipe';
import { FirstTrailer } from './first-trailer.pipe';
import { Runtime } from './runtime.pipe';
import { Allgenres } from './genres.pipe';
import { Overview } from './overview.pipe';
import { FormatNumber } from './format-number.pipe';
import { Director } from './director.pipe';
import { Writers } from './writers.pipe';
import { OrderCastCrew } from './order-cast-crew.pipe';
import { Countries } from './countries.pipe';
import { OrderGuest } from './order-guest.pipe';
import { OrderSimilar } from './oreder-similar.pipe';

const pages = [];

const views = [];

const services = [];

const pipes = [
  FindGenres,
  FirstTrailer,
  Runtime,
  Allgenres,
  Overview,
  FormatNumber,
  Director,
  Writers,
  OrderCastCrew,
  Countries,
  OrderGuest,
  OrderSimilar
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
