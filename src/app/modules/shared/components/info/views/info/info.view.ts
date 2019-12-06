import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieDetails } from '../../../../interfaces/movies/details/movie-details.interface';
import { ImageModalPage } from '../../../image-modal/page/image-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'info',
  templateUrl: 'info.view.html',
  styleUrls: [ 'info.view.scss' ]
})
export class InfoView implements OnInit {

  @Input() details: MovieDetails;
  @Output() allEpisodes = new EventEmitter<number>();

  metascoreColor: string;
  url = 'https://image.tmdb.org/t/p/w200';

  constructor(private _modalCtrl: ModalController) {
  }

  ngOnInit() {
    const metascore = +this.details.omdbDetails.Metascore;
    if (metascore < 40) {
      this.metascoreColor = '#f00';
    }
    if (metascore >= 40 && metascore <= 60) {
      this.metascoreColor = '#fc3';
    }
    if (metascore > 60) {
      this.metascoreColor = '#6c3';
    }
  }

  openPreview(img) {
    const url = 'https://image.tmdb.org/t/p/original' + img;
    img && this._modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        img: url
      },
    }).then(modal => modal.present());
  }

  onLoad() {
    // setTimeout(() => this.url = 'https://image.tmdb.org/t/p/original', 2000);
  }

}
