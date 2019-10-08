import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage implements OnInit {

  slides$: Observable<{ url: string }[]>;

  constructor(private _service: MoviesService) {
  }

  ngOnInit() {
    this.slides$ = this._service.findAllSlides();
  }

}
