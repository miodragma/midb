import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailsPage } from './pages/details/details.page';
import { MovieDetailsRoutingModule } from './movie-details-routing.module';

const pages = [ DetailsPage ];

const views = [];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  MovieDetailsRoutingModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class MoviesModule {
}
