import { Component, Input, OnInit } from '@angular/core';
import { ExternalIds } from '../../../../interfaces/external-ids/external-ids.interface';

@Component({
  selector: 'external-links',
  templateUrl: 'external-links.view.html',
  styleUrls: [ 'external-links.view.scss' ]
})
export class ExternalLinksView implements OnInit {

  @Input() externalIds: ExternalIds;
  @Input() id: number;
  @Input() type: string;
  @Input() homepage: string;

  isExternalIds = true;

  ngOnInit() {
    this.isExternalIds = Object.keys(this.externalIds).length > 0;
  }

  goToImdb(id) {
    return this.type === 'movies' || this.type === 'tv-shows' ? `https://www.imdb.com/title/${id}` : `https://www.imdb.com/name/${id}`;
  }

  goToTmdb(id) {
    return this.type === 'movies' ? `https://www.themoviedb.org/movie/${id}` :
      this.type === 'tv-shows' ? `https://www.themoviedb.org/tv/${id}` : `https://www.themoviedb.org/person/${id}`;
  }

}
