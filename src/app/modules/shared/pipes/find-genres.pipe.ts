import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../interfaces/genres/genre.interface';

@Pipe({ name: 'findGenres' })
export class FindGenres implements PipeTransform {
  transform(genreIds: number[], genres: Genre[]): string {
    if (genres) {
      return genres.filter(genre => genreIds.some(genreId => genreId === genre.id)).map(g => g.name).join(' | ');
    }
  }
}
