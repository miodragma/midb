import { Observable } from 'rxjs';
import { MovieResponse } from '../../../interfaces/movies/movie-response.interface';

export interface MovieData<T> {

  apiKey: string;
  url: string;

  findAllSlides: Observable<MovieResponse<T>>;
  findMoviesList: Observable<MovieResponse<T>>;

  findAllMoviesByValue: (value: string, page: number, param: string) => void;
  findMoreMoviesByValue: (value: string, page: number, param: string) => void;
  findAllMoviesByType: (type: string, page: number, param: string) => void;
  findMoreMoviesByType: (type: string, page: number, param: string) => void;

}
