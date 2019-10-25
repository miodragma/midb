import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../../../../interfaces/videos/video.interface';

@Component({
  selector: 'videos-list',
  templateUrl: 'videos-list.view.html',
  styleUrls: [ 'videos-list.view.scss' ]
})
export class VideosListView {

  @Input() videos: Video;
  @Output() playVideo = new EventEmitter<string>();
}
