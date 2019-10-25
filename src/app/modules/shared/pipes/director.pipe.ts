import { Pipe, PipeTransform } from '@angular/core';
import { Crew } from '../interfaces/credits/crew.interface';

@Pipe({ name: 'director' })
export class Director implements PipeTransform {
  transform(value: Array<Crew>): string {
    return value.filter(
      item => item.job === 'Director' || item.job === 'Executive Producer')
      .map(name => name.name).join(', ');
  }

}
