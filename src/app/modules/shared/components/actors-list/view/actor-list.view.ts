import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Actor } from '../../../interfaces/actor.interface';
import { MovieResponse } from '../../../interfaces/movie-response.interface';

@Component({
  selector: 'actor-list',
  templateUrl: 'actor-list.view.html',
  styleUrls: [ 'actor-list.view.scss' ]
})
export class ActorListView {

  @Output() checkActor = new EventEmitter<Actor>();
  @Output() more = new EventEmitter<number>();
  @Output() scroll = new EventEmitter();

  @Input() actors: MovieResponse<Actor>;
  @Input() singleActor: Actor;

}
