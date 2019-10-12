import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterRoutingModule } from './filter-routing.module';
import { FilterMaterialModule } from './filter-material-module';
import { SearchModule } from '../shared/components/search/search.module';
import { FilterPage } from './pages/filter.page';

const pages = [ FilterPage ];

const views = [];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  FormsModule,
  FilterRoutingModule,
  FilterMaterialModule,
  SearchModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class FilterModule {
}
