import { Component, OnInit } from '@angular/core';
import { MovieResponse } from '../../../shared/interfaces/movie-response.interface';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { Observable } from 'rxjs';
import { SlidesService } from '../../services/slides.service';

@Component({
  selector: 'slides',
  templateUrl: 'slides.view.html',
  styleUrls: [ 'slides.view.scss' ]
})
export class SlidesView implements OnInit {

  slideOpts = {
    allowTouchMove: false,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1000
  };

  slides$: Observable<MovieResponse<Movie>>;

  constructor(private _service: SlidesService) {
  }

  ngOnInit() {
    this.slides$ = this._service.slidesList;
  }

}
