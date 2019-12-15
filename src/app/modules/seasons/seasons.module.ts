import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SeasonsRoutingModule } from './seasons-routing.module';
import { ImageLoaderModule } from '../shared/components/image-loader/image-loader.module';
import { SeasonsListPage } from './pages/seasons-list/seasons-list.page';
import { SeasonsListView } from './views/seasons-list/seasons-list.view';
import { EpisodesListPage } from './pages/episodes-list/episodes-list.page';
import { EpisodesListView } from './views/episodes-list/episodes-list.view';
import { EpisodesService } from './services/episodes.service';
import { EpisodeDetailsPage } from './pages/episode-details/episode-details.page';
import { VideoTrailerModule } from '../shared/components/video/video-trailer.module';
import { EpisodeInfoView } from './views/episode-info/episode-info.view';
import { TopActorsListModule } from '../shared/components/top-actors-list/top-actors-list.module';
import { VideosListModule } from '../shared/components/videos-list/videos-list.module';
import { StorylineModule } from '../shared/components/storyline/storyline.module';
import { ImageModalModule } from '../shared/components/image-modal/image-modal.module';
import { TranslateModule } from '@ngx-translate/core';

const pages = [
  SeasonsListPage,
  EpisodesListPage,
  EpisodeDetailsPage
];

const views = [
  SeasonsListView,
  EpisodesListView,
  EpisodeInfoView
];

const services = [
  EpisodesService,
  YoutubeVideoPlayer,
  ScreenOrientation
];

const modules = [
  CommonModule,
  IonicModule,
  SeasonsRoutingModule,
  ImageLoaderModule,
  VideoTrailerModule,
  TopActorsListModule,
  VideosListModule,
  StorylineModule,
  ImageModalModule,
  TranslateModule.forChild()
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class SeasonsModule {
}
