import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SeasonsRoutingModule } from './seasons-routing.module';
import { ImageLoaderModule } from '../shared/components/image-loader/image-loader.module';
import { SeasonsListPage } from './pages/seasons-list/seasons-list.page';
import { SeasonsListView } from './views/seasons-list/seasons-list.view';
import { EpisodesListPage } from './pages/episodes-list/episodes-list.page';
import { EpisodesListView } from './views/episodes-list/episodes-list.view';
import { EpisodesService } from './services/episodes.service';

const pages = [ SeasonsListPage, EpisodesListPage ];

const views = [ SeasonsListView, EpisodesListView ];

const services = [ EpisodesService ];

const modules = [
  CommonModule,
  IonicModule,
  SeasonsRoutingModule,
  ImageLoaderModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class SeasonsModule {
}
