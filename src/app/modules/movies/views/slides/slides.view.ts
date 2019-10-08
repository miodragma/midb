import { Component, Input } from '@angular/core';

@Component({
  selector: 'slides',
  templateUrl: 'slides.view.html',
  styleUrls: [ 'slides.view.scss' ]
})
export class SlidesView {

  slideOpts = {
    allowTouchMove: false,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 500
  };

  @Input() slides: { url: string }[];

}
