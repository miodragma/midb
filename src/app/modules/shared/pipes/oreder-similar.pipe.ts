import { Pipe, PipeTransform } from '@angular/core';
import { SimilarResults } from '../interfaces/similar/similar-results.interface';

@Pipe({ name: 'orderSimilar' })
export class OrderSimilar implements PipeTransform {
  transform(value: SimilarResults[]): SimilarResults[] {
    return value.sort((a, b) => {
      const type = a.title ? 'release_date' : 'first_air_date';
      const keyA = new Date(a[type]);
      const keyB = new Date(b[type]);
      if (keyA < keyB) {
        return 1;
      }
      if (keyA > keyB) {
        return -1;
      }
      return 0;
    });
  }
}
