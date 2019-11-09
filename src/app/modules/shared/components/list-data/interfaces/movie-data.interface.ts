import { Observable } from 'rxjs';
import { MovieResponse } from '../../../interfaces/movies/movie-response.interface';

export interface MovieData<T> {

  apiKey: string;
  url: string;

  findAllSlides: Observable<MovieResponse<T>>;
  findMoviesList: Observable<MovieResponse<T>>;

  findAllMoviesByValue: (value: string, page: number) => void;
  findAllMoviesByType: (type: string, page: number) => void;
  findAllFilterMovies: (filter: string, page: number) => void;

}
