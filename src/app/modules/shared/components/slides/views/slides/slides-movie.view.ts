import { Component, Input } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../../../interfaces/movies/movie-response.interface';
import { SlidesService } from '../../../../services/slides.service';

@Component({
  selector: 'slides',
  templateUrl: 'slides-movie.view.html',
  styleUrls: [ 'slides-movie.view.scss' ]
})
export class SlidesMovieView {

  @Input() set type(type: string) {
    type === 'movies' && (this.slides$ = this._slidesService.findAllMovieTrendings());
    type === 'tvShow' && (this.slides$ = this._slidesService.findAllTvShowTrendings());
    setTimeout(() => this.paragraphShow = true, 3000);
  }

  constructor(private _slidesService: SlidesService) {
  }

  paragraphShow = false;

  slides$: Observable<MovieResponse<any>>;

  slideOpts = {
    // allowTouchMove: false,
    autoplay: true,
    // slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 500
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  trackByFn(index, item) {
    return item.backdrop_path;
  }

}
