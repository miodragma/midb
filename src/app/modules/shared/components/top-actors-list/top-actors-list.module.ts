import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TopActorsListView } from './views/top-actors-list/top-actors-list.view';
import { PipesModule } from '../../pipes/pipes.module';

const pages = [];

const views = [ TopActorsListView ];

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
export class TopActorsListModule {
}
