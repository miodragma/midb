import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Actor } from '../../../interfaces/actor.interface';
import { MovieResponse } from '../../../interfaces/movie-response.interface';

@Component({
  selector: 'actor-list',
  templateUrl: 'actor-list.view.html',
  styleUrls: [ 'actor-list.view.scss' ]
})
export class ActorListView {

  @Output() search = new EventEmitter();
  @Output() checkActor = new EventEmitter<Actor>();
  @Output() more = new EventEmitter<number>();

  @Input() actors: MovieResponse<Actor>;
  @Input() singleActor: Actor;
  @Input() isFilter: boolean;

}
