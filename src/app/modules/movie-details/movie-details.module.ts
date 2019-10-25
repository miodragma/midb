import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailsPage } from './pages/details/details.page';
import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { VideoTrailerModule } from '../shared/components/video/video-trailer.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DetailsService } from './services/details.service';
import { InfoView } from './views/info/info.view';
import { PipesModule } from '../shared/pipes/pipes.module';
import { TopActorsListModule } from '../shared/components/top-actors-list/top-actors-list.module';
import { VideosListModule } from '../shared/components/videos-list/videos-list.module';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

const pages = [ DetailsPage ];

const views = [ InfoView ];

const services = [ ScreenOrientation, DetailsService, YoutubeVideoPlayer ];

const modules = [
  CommonModule,
  IonicModule,
  MovieDetailsRoutingModule,
  PipesModule,
  VideoTrailerModule,
  TopActorsListModule,
  VideosListModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class MoviesModule {
}
