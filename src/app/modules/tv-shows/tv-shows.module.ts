import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsPage } from './pages/tv-shows/tv-shows.page';
import { SearchModule } from '../shared/components/search/search.module';
import { TypeModule } from '../shared/components/type/type.module';
import { DataListModule } from '../shared/components/data-list/data-list.module';
import { TvShowService } from './services/tv-show.service';
import { SlidesModule } from '../shared/components/slides/slides.module';

const pages = [ TvShowsPage ];

const views = [];

const services = [ TvShowService ];

const modules = [
  CommonModule,
  IonicModule,
  TvShowsRoutingModule,
  SearchModule,
  TypeModule,
  DataListModule,
  SlidesModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class TvShowsModule {
}
