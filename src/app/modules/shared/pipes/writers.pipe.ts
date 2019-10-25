import { Pipe, PipeTransform } from '@angular/core';
import { Crew } from '../interfaces/credits/crew.interface';

@Pipe({ name: 'writers' })
export class Writers implements PipeTransform {
  transform(value: Array<Crew>): string {
    return value.filter(item => item.department === 'Writing')
      .map(writer => writer.name.concat(` (${writer.job})`))
      .splice(0, 2).join(', ').concat(', and others');
  }

}
