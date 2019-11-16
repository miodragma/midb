import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailsPage } from './pages/details/details.page';
import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { VideoTrailerModule } from '../shared/components/video/video-trailer.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { DetailsService } from './services/details.service';
import { TopActorsListModule } from '../shared/components/top-actors-list/top-actors-list.module';
import { VideosListModule } from '../shared/components/videos-list/videos-list.module';
import { ImagesListModule } from '../shared/components/images-list/images-list.module';
import { SimilarModule } from '../shared/components/similar-list/similar.module';
import { StorylineModule } from '../shared/components/storyline/storyline.module';
import { DetailsInfoModule } from '../shared/components/details-info/details-info.module';
import { InfoModule } from '../shared/components/info/info.module';
import { PopoverListView } from '../shared/components/popover-list/views/popover-list/popover-list.view';
import { CreateNotificationView } from '../shared/components/notification/create-notification.view';

const pages = [ DetailsPage ];

const views = [ PopoverListView, CreateNotificationView ];

const services = [ ScreenOrientation, DetailsService, YoutubeVideoPlayer, NativeStorage ];

const modules = [
  CommonModule,
  IonicModule,
  MovieDetailsRoutingModule,
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
  providers: [ ...services ],
  entryComponents: [ ...views ]
})
export class MoviesModule {
}
