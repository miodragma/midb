import { Component, Input } from '@angular/core';
import { Image } from '../../../../interfaces/images/image.interface';

@Component({
  selector: 'images-list',
  templateUrl: 'images-list.view.html',
  styleUrls: [ 'images-list.view.scss' ]
})
export class ImagesListView {

  @Input() images: Image;
  url = 'https://image.tmdb.org/t/p/w200';

  trackByFn(index, item) {
    return item.file_path;
  }

  onLoad() {
    this.url = 'https://image.tmdb.org/t/p/original';
  }

}
