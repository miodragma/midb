import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'type',
  templateUrl: 'type.view.html',
  styleUrls: [ 'type.view.scss' ]
})
export class TypeView {

  @Output() selectSegment = new EventEmitter<CustomEvent>();

}
