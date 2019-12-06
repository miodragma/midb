import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../../../../interfaces/videos/video.interface';

@Component({
  selector: 'video-trailer',
  templateUrl: 'video-trailer.view.html',
  styleUrls: [ 'video-trailer.view.scss' ]
})
export class VideoTrailerView {

  @Input() videos: Video;
  @Output() playVideo = new EventEmitter<string>();

  path = '/default.jpg';

  onLoad() {
    setTimeout(() => this.path = '/hqdefault.jpg', 1000);
  }

}
