import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Season } from '../../../shared/interfaces/season-list/season.interface';

@Component({
  selector: 'episodes-list',
  templateUrl: 'episodes-list.view.html',
  styleUrls: [ 'episodes-list.view.scss' ]
})
export class EpisodesListView {

  @Input() season: Season;
  @Output() episodeClicked = new EventEmitter<number>();

}
