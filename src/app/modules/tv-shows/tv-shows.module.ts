import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsPage } from './pages/tv-shows/tv-shows.page';
import { SlidesTvShowView } from './views/slides/slides-tv-show.view';
import { SearchModule } from '../shared/components/search/search.module';
import { TypeModule } from '../shared/components/type/type.module';
import { DataListModule } from '../shared/components/data-list/data-list.module';
import { TvShowService } from './services/tv-show.service';

const pages = [ TvShowsPage ];

const views = [ SlidesTvShowView ];

const services = [ TvShowService ];

const modules = [
  CommonModule,
  IonicModule,
  TvShowsRoutingModule,
  SearchModule,
  TypeModule,
  DataListModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class TvShowsModule {
}
