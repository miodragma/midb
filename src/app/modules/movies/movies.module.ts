import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { MoviesRoutingModule } from './movies-routing.module';
import { SearchModule } from '../shared/components/search/search.module';
import { DataListModule } from '../shared/components/data-list/data-list.module';
import { TypeModule } from '../shared/components/type/type.module';
import { SlidesModule } from '../shared/components/slides/slides.module';

import { MoviesService } from './services/movies.service';
import { DetailsService } from '../movie-details/services/details.service';

import { MoviesPage } from './pages/movies/movies.page';

const pages = [ MoviesPage ];

const views = [];

const services = [ MoviesService, OneSignal, DetailsService, NativeStorage ];

const modules = [
  CommonModule,
  IonicModule,
  MoviesRoutingModule,
  SearchModule,
  DataListModule,
  TypeModule,
  SlidesModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class MoviesModule {
}
