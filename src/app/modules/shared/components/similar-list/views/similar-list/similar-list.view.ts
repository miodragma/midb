import { Component, Input } from '@angular/core';
import { SimilarResults } from '../../../../interfaces/similar/similar-results.interface';

@Component({
  selector: 'similar-list',
  templateUrl: 'similar-list.view.html',
  styleUrls: [ 'similar-list.view.scss' ]
})
export class SimilarListView {

  @Input() title: string;
  @Input() similar: SimilarResults[];

}
