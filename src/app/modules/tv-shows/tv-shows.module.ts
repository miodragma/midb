import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsPage } from './pages/tv-shows/tv-shows.page';

const pages = [ TvShowsPage ];

const views = [];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  TvShowsRoutingModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class TvShowsModule {
}
