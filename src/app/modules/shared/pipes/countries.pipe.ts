import { Pipe, PipeTransform } from '@angular/core';
import { ProductionCountries } from '../interfaces/productions/production-countries.interface';

@Pipe({ name: 'countries' })
export class Countries implements PipeTransform {
  transform(value: Array<ProductionCountries>): string {
    return value.map(item => item.name).join(', ');
  }

}
