import { Component, Input } from '@angular/core';
import { MovieDetails } from '../../../../interfaces/movies/details/movie-details.interface';

@Component({
  selector: 'details-info',
  templateUrl: 'details-info.view.html',
  styleUrls: [ 'details-info.view.scss' ]
})
export class DetailsInfoView {

  @Input() detailsInfo: MovieDetails;

}
