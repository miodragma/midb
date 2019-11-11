import { Component, Input } from '@angular/core';
import { Episode } from '../../../shared/interfaces/episodes/episode.interface';

@Component({
  selector: 'episode-info',
  templateUrl: 'episode-info.view.html',
  styleUrls: [ 'episode-info.view.scss' ]
})
export class EpisodeInfoView {

  @Input() episodeDetails: Episode;

}
