import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { MovieResponse } from '../../../shared/interfaces/movie-response.interface';
import { Genre } from '../../../shared/interfaces/genre.interface';

@Component({
  templateUrl: 'movies.page.html',
  styleUrls: [ 'movies.page.scss' ]
})
export class MoviesPage implements OnInit {

  slides$: Observable<{ url: string }[]>;
  movies$: Observable<MovieResponse>;
  movieGenres$: Observable<{ genres: Genre[] }>;

  constructor(private _service: MoviesService) {
  }

  ngOnInit() {
    this.slides$ = this._service.findAllSlides();
    this.movieGenres$ = this._service.findAllMovieGenres();
  }

  onSearch(value) {
    this.movies$ = this._service.findAllMovies(value, 1);
  }

  onClickMovie(id: number) {
    console.log(id);
  }

}
