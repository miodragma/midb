import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../interfaces/genres/genre.interface';

@Pipe({ name: 'allGenres' })
export class Allgenres implements PipeTransform {
  transform(value: Genre[]): string {
    return value.map(genre => genre.name).join(' | ');
  }
}
