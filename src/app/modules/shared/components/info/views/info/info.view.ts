import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieDetails } from '../../../../interfaces/movies/details/movie-details.interface';

@Component({
  selector: 'info',
  templateUrl: 'info.view.html',
  styleUrls: [ 'info.view.scss' ]
})
export class InfoView {

  @Input() details: MovieDetails;
  @Output() allEpisodes = new EventEmitter<number>();

}
