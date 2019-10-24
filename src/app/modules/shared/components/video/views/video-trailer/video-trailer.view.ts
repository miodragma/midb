import { Component, Input } from '@angular/core';
import { Video } from '../../../../interfaces/videos/video.interface';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

@Component({
  selector: 'video-trailer',
  templateUrl: 'video-trailer.view.html',
  styleUrls: [ 'video-trailer.view.scss' ]
})
export class VideoTrailerView {

  @Input() videos: Video;

  constructor(private _youtube: YoutubeVideoPlayer) {
  }

  playVideo(video: Video) {
    const id = video.results.find(curTrailer => curTrailer.type === 'Trailer').key;
    this._youtube.openVideo(id);
  }

}
