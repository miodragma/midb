import { Genre } from '../../../interfaces/genre.interface';
import { Observable } from 'rxjs';

export interface GenreData {

  genresList: Observable<{ genres: Genre[] }>;

}
