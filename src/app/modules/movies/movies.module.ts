import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesPage } from './pages/movies/movies.page';
import { SlidesView } from './views/slides/slides.view';
import { MoviesService } from './services/movies.service';
import { SearchModule } from '../shared/components/search/search.module';
import { DataListModule } from '../shared/components/data-list/data-list.module';

const pages = [ MoviesPage ];

const views = [ SlidesView ];

const services = [ MoviesService ];

const modules = [
  CommonModule,
  IonicModule,
  MoviesRoutingModule,
  SearchModule,
  DataListModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class MoviesModule {
}
