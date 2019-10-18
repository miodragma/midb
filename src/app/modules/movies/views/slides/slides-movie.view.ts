import { Component, OnInit } from '@angular/core';
import { MovieResponse } from '../../../shared/interfaces/movie-response.interface';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { Observable } from 'rxjs';
import { SlidesMovieService } from '../../services/slides-movie.service';

@Component({
  selector: 'movies-slides',
  templateUrl: 'slides-movie.view.html',
  styleUrls: [ 'slides-movie.view.scss' ]
})
export class SlidesMovieView implements OnInit {

  slideOpts = {
    allowTouchMove: false,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    // speed: 1000
  };

  slides$: Observable<MovieResponse<Movie>>;

  constructor(private _service: SlidesMovieService) {
  }

  ngOnInit() {
    this.slides$ = this._service.slidesList;
  }

}
