import { Component } from '@angular/core';

@Component({
  selector: 'skeleton-item-list',
  templateUrl: 'skeleton-item-list.view.html',
  styleUrls: [ 'skeleton-item-list.view.scss' ]
})
export class SkeletonItemListView {

  skeletons = new Array(10);

}
