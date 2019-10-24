import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VideoTrailerView } from './views/video-trailer/video-trailer.view';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { PipesModule } from '../../pipes/pipes.module';

const pages = [];

const views = [ VideoTrailerView ];

const services = [ YoutubeVideoPlayer ];

const modules = [
  CommonModule,
  IonicModule,
  PipesModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class VideoTrailerModule {
}
