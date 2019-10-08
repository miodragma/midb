import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../interfaces/movie.interface';
import { Genre } from '../../../interfaces/genre.interface';

@Component({
  selector: 'data-list',
  templateUrl: 'data-list.view.html',
  styleUrls: [ 'data-list.view.scss' ]
})
export class DataListView {

  @Output() clicked = new EventEmitter<number>();

  @Input() movies: Movie[];
  @Input() genres: Genre[];

}
