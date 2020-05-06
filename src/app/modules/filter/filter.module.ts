import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterRoutingModule } from './filter-routing.module';
import { FilterService } from './services/filter.service';
import { ActorListModule } from '../shared/components/actors-list/actor-list.module';
import { SearchModule } from '../shared/components/search/search.module';
import { TranslateModule } from '@ngx-translate/core';
import { FilterPage } from './pages/filter.page';
import { HelperService } from '../shared/services/helper.service';

const pages = [ FilterPage ];

const views = [];

const services = [ FilterService, HelperService ];

const modules = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  FilterRoutingModule,
  ActorListModule,
  SearchModule,
  TranslateModule.forChild()
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class FilterModule {
}
