import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterRoutingModule } from './filter-routing.module';
import { FilterPage } from './pages/filter.page';
import { FilterService } from './services/filter.service';
import { ActorListModule } from '../shared/components/actors-list/actor-list.module';
import { SearchModule } from '../shared/components/search/search.module';

const pages = [ FilterPage ];

const views = [];

const services = [ FilterService ];

const modules = [
  CommonModule,
  IonicModule,
  FormsModule,
  FilterRoutingModule,
  ActorListModule,
  SearchModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class FilterModule {
}
