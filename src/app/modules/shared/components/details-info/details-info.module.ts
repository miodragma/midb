import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailsInfoView } from './views/details-info/details-info.view';
import { PipesModule } from '../../pipes/pipes.module';

const pages = [];

const views = [ DetailsInfoView ];

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
export class DetailsInfoModule {
}
