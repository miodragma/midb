import { Pipe, PipeTransform } from '@angular/core';
import { Cast } from '../interfaces/credits/cast.interface';

@Pipe({ name: 'orderCastCrew' })
export class OrderCastCrew implements PipeTransform {
  transform(value: Cast[]): Cast[] {
    return value.sort((a, b) => a.order - b.order);
  }

}
