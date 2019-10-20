import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'type',
  templateUrl: 'type.view.html',
  styleUrls: [ 'type.view.scss' ]
})
export class TypeView {

  @Input() segment: string;

  @Output() selectSegment = new EventEmitter<CustomEvent>();

}
