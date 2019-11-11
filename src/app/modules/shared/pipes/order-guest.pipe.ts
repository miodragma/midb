import { Pipe, PipeTransform } from '@angular/core';
import { Guest } from '../interfaces/credits/guest.interface';

@Pipe({ name: 'guestOrder' })
export class OrderGuest implements PipeTransform {
  transform(value: Guest[]): Guest[] {
    return value.sort((a, b) => a.order - b.order);
  }

}
