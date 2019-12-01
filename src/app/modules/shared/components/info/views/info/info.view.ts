import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieDetails } from '../../../../interfaces/movies/details/movie-details.interface';

@Component({
  selector: 'info',
  templateUrl: 'info.view.html',
  styleUrls: [ 'info.view.scss' ]
})
export class InfoView implements OnInit {

  @Input() details: MovieDetails;
  @Output() allEpisodes = new EventEmitter<number>();

  metascoreColor: string;

  ngOnInit() {
    const metascore = +this.details.omdbDetails.Metascore;
    if (metascore < 40) {
      this.metascoreColor = '#f00';
    }
    if (metascore >= 40 && metascore <= 60) {
      this.metascoreColor = '#fc3';
    }
    if (metascore > 60) {
      this.metascoreColor = '#6c3';
    }
  }

}
