import { Movie } from '../../../interfaces/movie.interface';
import { TvShow } from '../../../../tv-shows/interfaces/tv-show.interface';

export interface MovieList extends Movie, TvShow {
}
