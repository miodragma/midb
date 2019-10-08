import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../interfaces/genre.interface';

@Pipe({ name: 'findGenres' })
export class FindGenres implements PipeTransform {
  transform(genreIds: [], genres: Genre[]): string {
    return genres.filter(genre => genreIds.some(genreId => genreId === genre.id)).map(g => g.name).join(' | ');
  }
}
