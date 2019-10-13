import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SearchModule } from '../search/search.module';
import { ActorListView } from './view/actor-list.view';

const pages = [];

const views = [ ActorListView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  SearchModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class ActorListModule {
}
