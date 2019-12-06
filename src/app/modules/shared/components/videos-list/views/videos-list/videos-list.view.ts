import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../../../../interfaces/videos/video.interface';

@Component({
  selector: 'videos-list',
  templateUrl: 'videos-list.view.html',
  styleUrls: [ 'videos-list.view.scss' ]
})
export class VideosListView {

  path = '/default.jpg';

  @Input() videos: Video;
  @Output() playVideo = new EventEmitter<string>();

  onLoad() {
    setTimeout(() => this.path = '/hqdefault.jpg', 2000);
  }
}
