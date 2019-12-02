import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { SimilarResults } from '../../../../interfaces/similar/similar-results.interface';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Watchlist } from '../../../../../watchlist/models/watchlist.model';
import { DetailsService } from '../../../../../movie-details/services/details.service';

@Component({
  selector: 'similar-list',
  templateUrl: 'similar-list.view.html',
  styleUrls: [ 'similar-list.view.scss' ]
})
export class SimilarListView implements OnInit {

  @ViewChildren('bookmark') bookmark: QueryList<any>;

  @Input() title: string;
  @Input() similar: SimilarResults[];
  @Output() navigateMovie = new EventEmitter<SimilarResults>();

  watchlistMovies: Watchlist[] = [];

  constructor(
    private _nativeStorage: NativeStorage,
    private _movieDetailsService: DetailsService) {
  }

  ngOnInit() {
    this._nativeStorage.getItem('movies')
      .then(res => {
        this.watchlistMovies = res.watchlist;
      });
  }

  trackByFn(index, item) {
    return item.poster_path;
  }

  isColor(movieId: number) {
    return this.watchlistMovies.findIndex(movie => movie.id === movieId) > -1 ? 'primary' : 'medium';
  }

  addToWatchlist(movieId: number, index: number) {
    this._movieDetailsService.findDetailsById(movieId)
      .subscribe(data => {
        const movie = new Watchlist(
          data.id, data.original_title, data.poster_path, data.omdbDetails.Genre, data.omdbDetails.Released, data.omdbDetails.Actors
        );
        let currWatchlist = { watchlist: [], reminder: [] };
        this._nativeStorage.keys().then(resKeys => {
          if (resKeys[0] === 'movies') {
            this._nativeStorage.getItem('movies')
              .then(res => {
                currWatchlist = res;
                if (currWatchlist.watchlist.some(item => item.id === movie.id)) {
                  return;
                  // this.onShowToast(`${movie.title} is already in Watchlist!`);
                } else {
                  currWatchlist.watchlist.push(movie);
                  this._nativeStorage.setItem('movies', currWatchlist).then(ress => {
                    this.bookmark.find((b, i) => i === index).color = 'primary';
                    // this.onShowToast(`${movie.title} has been added to Watchlist!`);
                  });
                }
              });
          } else {
            this._nativeStorage.setItem('movies', { watchlist: [ movie ], reminder: [] }).then(res => {
              this.bookmark.find((b, i) => i === index).color = 'primary';
              return;
              // this.onShowToast(`${movie.title} has been added to Watchlist!`);
            });
          }
        })
          .catch(error => {
            return;
            // this.onShowToast(`Error ${error}!`);
          });
      });
  }

}
