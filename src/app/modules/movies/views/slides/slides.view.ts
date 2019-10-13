import { Component, Input } from '@angular/core';
import { MovieResponse } from '../../../shared/interfaces/movie-response.interface';
import { Movie } from '../../../shared/interfaces/movie.interface';

@Component({
  selector: 'slides',
  templateUrl: 'slides.view.html',
  styleUrls: [ 'slides.view.scss' ]
})
export class SlidesView {

  slideOpts = {
    allowTouchMove: false,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1000
  };

  @Input() slides: MovieResponse<Movie>;

}
