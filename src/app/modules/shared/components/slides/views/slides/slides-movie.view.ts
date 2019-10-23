import { Component, Input } from '@angular/core';
import { MovieResponse } from '../../../../interfaces/movie-response.interface';
import { MovieList } from '../../../list-data/interfaces/movie-list.interface';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'slides',
  templateUrl: 'slides-movie.view.html',
  styleUrls: [ 'slides-movie.view.scss' ]
})
export class SlidesMovieView {

  @Input() slides: MovieResponse<MovieList>;

  slideOpts = {
    // allowTouchMove: false,
    autoplay: true,
    // slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1000
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

}
