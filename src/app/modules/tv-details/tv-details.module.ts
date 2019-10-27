import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailsPage } from './pages/details/details.page';
import { TvDetailsRoutingModule } from './tv-details-routing.module';
import { VideoTrailerModule } from '../shared/components/video/video-trailer.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DetailsService } from './services/details.service';
import { TopActorsListModule } from '../shared/components/top-actors-list/top-actors-list.module';
import { VideosListModule } from '../shared/components/videos-list/videos-list.module';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ImagesListModule } from '../shared/components/images-list/images-list.module';
import { SimilarModule } from '../shared/components/similar-list/similar.module';
import { StorylineModule } from '../shared/components/storyline/storyline.module';
import { DetailsInfoModule } from '../shared/components/details-info/details-info.module';
import { InfoModule } from '../shared/components/info/info.module';

const pages = [ DetailsPage ];

const views = [];

const services = [ ScreenOrientation, DetailsService, YoutubeVideoPlayer ];

const modules = [
  CommonModule,
  IonicModule,
  TvDetailsRoutingModule,
  VideoTrailerModule,
  InfoModule,
  TopActorsListModule,
  VideosListModule,
  ImagesListModule,
  SimilarModule,
  StorylineModule,
  DetailsInfoModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class TvDetailsModule {
}
