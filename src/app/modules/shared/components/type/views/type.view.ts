import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { IonSegmentButton } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'type',
  templateUrl: 'type.view.html',
  styleUrls: [ 'type.view.scss' ]
})
export class TypeView {

  @ViewChild('segmentButton', { static: true }) segmentButton: IonSegmentButton;

  @Input() segment: string;

  @Input() set type(type: string) {
    of(type)
      .pipe(
        tap(segmentType => {
          segmentType && (this.segmentButton.value = segmentType);
        })
      )
      .subscribe();
  }

  @Output() selectSegment = new EventEmitter<CustomEvent>();

}
