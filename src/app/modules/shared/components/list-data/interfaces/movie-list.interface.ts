import { Movie } from '../../../interfaces/movies/movie.interface';
import { TvShow } from '../../../../tv-shows/interfaces/tv-show.interface';

export interface MovieList extends Movie, TvShow {
}
