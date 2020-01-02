import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CelebritiesDetailsRoutingModule } from './celebrities-details-routing.module';
import { DetailsPage } from './pages/details/details.page';
import { CelebritiesDetailsService } from './services/celebrities-details.service';
import { PipesModule } from '../shared/pipes/pipes.module';
import { TopActorsListModule } from '../shared/components/top-actors-list/top-actors-list.module';
import { ImageLoaderModule } from '../shared/components/image-loader/image-loader.module';
import { ImageModalModule } from '../shared/components/image-modal/image-modal.module';
import { TranslateModule } from '@ngx-translate/core';
import { ExternalLinksModule } from '../shared/components/external-links/external-links.module';

const pages = [ DetailsPage ];

const views = [];

const services = [ CelebritiesDetailsService ];

const modules = [
  CommonModule,
  IonicModule,
  CelebritiesDetailsRoutingModule,
  PipesModule,
  TopActorsListModule,
  ImageLoaderModule,
  ImageModalModule,
  ExternalLinksModule,
  TranslateModule.forChild()
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class CelebritiesDetailsModule {
}
