import { Observable } from 'rxjs';
import { MovieResponse } from '../../../interfaces/movies/movie-response.interface';

export interface MovieData<T> {

  apiKey: string;
  url: string;

  findAllMoviesByValue: (value: string, page: number, refresher) => Observable<MovieResponse<T>>;
  findAllMoviesByType: (type: string, page: number, refresher) => Observable<MovieResponse<T>>;
  findAllFilterMovies: (filter: string, page: number, refresher) => Observable<MovieResponse<T>>;

}
