import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'runtime' })
export class Runtime implements PipeTransform {
  transform(value: number): string {
    const hours = (value / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return `${rhours}h ${rminutes > 0 ? rminutes + 'min' : ''}`;
  }

}
