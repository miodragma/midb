import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'overview' })
export class Overview implements PipeTransform {
  transform(value: string, len: number): string {
    return len < 200 ? value.length >= len ? value.slice(0, len).trim().concat('...') : value : value.slice(0, 200).trim().concat('...');
  }
}
