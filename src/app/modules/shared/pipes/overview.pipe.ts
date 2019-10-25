import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'overview' })
export class Overview implements PipeTransform {
  transform(value: string): string {
    return value.length > 200 ? value.slice(0, 200).trim().concat('...') : value;
  }
}
