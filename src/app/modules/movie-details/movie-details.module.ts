import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailsPage } from './pages/details/details.page';
import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { VideoTrailerModule } from '../shared/components/video/video-trailer.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DetailsService } from './services/details.service';

const pages = [ DetailsPage ];

const views = [];

const services = [ ScreenOrientation, DetailsService ];

const modules = [
  CommonModule,
  IonicModule,
  MovieDetailsRoutingModule,
  VideoTrailerModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class MoviesModule {
}
