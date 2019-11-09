import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Crew } from '../../../../interfaces/credits/crew.interface';
import { Cast } from '../../../../interfaces/credits/cast.interface';

@Component({
  selector: 'top-actors-list',
  templateUrl: 'top-actors-list.view.html',
  styleUrls: [ 'top-actors-list.view.scss' ]
})
export class TopActorsListView {

  @Input() casts: Cast[];
  @Input() crews: Crew[];
  @Input() title: string;
  @Output() navigateCast = new EventEmitter<Cast>();

  trackByFn(index, item) {
    return item.profile_path;
  }

}
