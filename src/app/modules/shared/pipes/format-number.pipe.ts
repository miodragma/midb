import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatNumber' })
export class FormatNumber implements PipeTransform {
  transform(value: any): string {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

}
