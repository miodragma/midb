import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Actor } from '../../../interfaces/actors/actor.interface';
import { MovieResponse } from '../../../interfaces/movies/movie-response.interface';

@Component({
  selector: 'actor-list',
  templateUrl: 'actor-list.view.html',
  styleUrls: [ 'actor-list.view.scss' ]
})
export class ActorListView {

  @Output() checkActor = new EventEmitter<Actor>();
  @Output() clickedPage = new EventEmitter<number>();

  @Input() actors: MovieResponse<Actor>;
  @Input() singleActor: Actor;

  url = 'https://image.tmdb.org/t/p/w200';

  constructor(private _elRef: ElementRef) {
  }

  onLoad() {
    setTimeout(() => this.url = 'https://image.tmdb.org/t/p/original', 2000);
  }

  counter(i: number) {
    return new Array(i);
  }

  trackByFn(index) {
    return index;
  }

  onClickedPage(page) {
    const el = this._elRef.nativeElement.querySelector('ion-col');
    el.scrollIntoView();
    this.clickedPage.emit(page);
  }

}
