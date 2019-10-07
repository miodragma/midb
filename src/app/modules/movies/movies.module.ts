import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesPage } from './pages/movies/movies.page';

const pages = [ MoviesPage ];

const views = [];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  MoviesRoutingModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class MoviesModule {
}
