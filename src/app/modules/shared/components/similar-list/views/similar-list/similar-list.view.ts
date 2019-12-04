import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { SimilarResults } from '../../../../interfaces/similar/similar-results.interface';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Watchlist } from '../../../../../watchlist/models/watchlist.model';
import { DetailsService } from '../../../../../movie-details/services/details.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'similar-list',
  templateUrl: 'similar-list.view.html',
  styleUrls: [ 'similar-list.view.scss' ]
})
export class SimilarListView implements OnInit {

  @ViewChildren('bookmark') bookmark: QueryList<any>;

  @Input() title: string;
  @Input() watchlistType: string;
  @Input() similar: SimilarResults[];
  @Output() navigateMovie = new EventEmitter<SimilarResults>();

  currWatchlistMovies: { watchlistMovies: [], watchlistTvShows: [] };
  bookmarkIndex = -1;

  constructor(
    private _nativeStorage: NativeStorage,
    private _toastCtrl: ToastController,
    private _movieDetailsService: DetailsService) {
  }

  ngOnInit() {
    this._nativeStorage.getItem('movies')
      .then(res => this.currWatchlistMovies = res);
  }

  trackByFn(index, item) {
    return item.poster_path;
  }

  isColor(movieId: number) {
    if (this.currWatchlistMovies) {
      return this.currWatchlistMovies[this.watchlistType].findIndex(movie => movie.id === movieId) > -1 ? 'primary' : 'medium';
    }
    return 'medium';
  }

  addToWatchlist(movieId: number, index: number) {
    this.bookmarkIndex = index;
    this._movieDetailsService.findDetailsById(movieId)
      .subscribe(data => {
        const movie = new Watchlist(
          data.id, data.original_title, data.poster_path, data.omdbDetails.Genre, data.omdbDetails.Released, data.omdbDetails.Actors, 'watchlistMovies'
        );
        let currWatchlist = { watchlistMovies: [], watchlistTvShows: [] };
        this._nativeStorage.keys().then(resKeys => {
          if (resKeys[0] === 'movies') {
            this._nativeStorage.getItem('movies')
              .then(res => {
                currWatchlist = res;
                if (currWatchlist[this.watchlistType].some(item => item.id === movie.id)) {
                  this.bookmark.find((b, i) => i === index).color = 'primary';
                  this.bookmarkIndex = -1;
                  return;
                } else {
                  currWatchlist[this.watchlistType].push(movie);
                  this._nativeStorage.setItem('movies', currWatchlist).then(ress => {
                    this.hasBeenAdded(movie, index);
                    return;
                  });
                }
              });
          } else {
            this._nativeStorage.setItem('movies', { watchlistMovies: [ movie ], watchlistTvShows: [] }).then(res => {
              this.hasBeenAdded(movie, index);
              return;
            });
          }
        })
          .catch(error => {
            this.onShowToast(`Error ${error}!`);
            this.bookmarkIndex = -1;
          });
      });
  }

  hasBeenAdded(movie: Watchlist, index: number) {
    this.bookmark.find((b, i) => i === index).color = 'primary';
    this.onShowToast(`${movie.title} has been added to Watchlist!`);
    this.bookmarkIndex = -1;
  }

  onShowToast(newMessage) {
    this._toastCtrl.create({
      message: newMessage,
      duration: 2000
    })
      .then(toastEl => toastEl.present());
  }

}
