import { Component, Input } from '@angular/core';
import { Image } from '../../../../interfaces/images/image.interface';

@Component({
  selector: 'images-list',
  templateUrl: 'images-list.view.html',
  styleUrls: [ 'images-list.view.scss' ]
})
export class ImagesListView {

  @Input() images: Image;

  trackByFn(index, item) {
    return item.file_path;
  }

}
