import { Component, OnInit } from '@angular/core';
import { MovieResponse } from '../../../shared/interfaces/movie-response.interface';
import { Observable } from 'rxjs';
import { SlidesTvShowService } from '../../services/slides-tv-show.service';
import { TvShow } from '../../interfaces/tv-show.interface';

@Component({
  selector: 'tv-shows-slides',
  templateUrl: 'slides-tv-show.view.html',
  styleUrls: [ 'slides-tv-show.view.scss' ]
})
export class SlidesTvShowView implements OnInit {

  slideOpts = {
    allowTouchMove: false,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1000
  };

  slides$: Observable<MovieResponse<TvShow>>;

  constructor(private _service: SlidesTvShowService) {
  }

  ngOnInit() {
    this.slides$ = this._service.slidesList;
  }

}
