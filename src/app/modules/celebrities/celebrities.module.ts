import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CelebritiesRoutingModule } from './celebrities-routing.module';
import { CelebritiesPage } from './pages/celebrities/celebrities.page';
import { SearchModule } from '../shared/components/search/search.module';
import { ActorListModule } from '../shared/components/actors-list/actor-list.module';
import { CelebritiesService } from './services/celebrities.service';

const pages = [ CelebritiesPage ];

const views = [];

const services = [ CelebritiesService ];

const modules = [
  CommonModule,
  IonicModule,
  CelebritiesRoutingModule,
  SearchModule,
  ActorListModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class CelebritiesModule {
}
