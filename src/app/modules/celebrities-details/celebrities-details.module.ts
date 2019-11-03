import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CelebritiesDetailsRoutingModule } from './celebrities-details-routing.module';
import { DetailsPage } from './pages/details/details.page';
import { CelebritiesDetailsService } from './services/celebrities-details.service';
import { PipesModule } from '../shared/pipes/pipes.module';
import { TopActorsListModule } from '../shared/components/top-actors-list/top-actors-list.module';

const pages = [ DetailsPage ];

const views = [];

const services = [ CelebritiesDetailsService ];

const modules = [
  CommonModule,
  IonicModule,
  CelebritiesDetailsRoutingModule,
  PipesModule,
  TopActorsListModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class CelebritiesDetailsModule {
}
