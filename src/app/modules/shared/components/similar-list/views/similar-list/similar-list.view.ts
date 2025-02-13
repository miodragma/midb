import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { SimilarResults } from '../../../../interfaces/similar/similar-results.interface';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Watchlist } from '../../../../../watchlist/models/watchlist.model';
import { DetailsService } from '../../../../../movie-details/services/details.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ImageModalPage } from '../../../image-modal/page/image-modal.page';
import { TranslateService } from '@ngx-translate/core';
import { GenresService } from '../../../../services/genres.service';

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
  url = 'https://image.tmdb.org/t/p/w200';

  slice = 4;

  hasBeenAddedToWatchlist = '';

  constructor(
    private _nativeStorage: NativeStorage,
    private _toastCtrl: ToastController,
    private _movieDetailsService: DetailsService,
    private _modalCtrl: ModalController,
    private _translate: TranslateService,
    private _genresService: GenresService) {
  }

  ngOnInit() {
    this._nativeStorage.getItem('movies')
      .then(res => this.currWatchlistMovies = res);

    this._translate.get('labels.has_been_added_to_watchlist!').subscribe(text => this.hasBeenAddedToWatchlist = text);
  }

  trackByFn(index, item) {
    return item.poster_path;
  }

  onExpand(length) {
    console.log(length);
    this.slice = length;
  }

  isColor(movieId: number) {
    if (this.currWatchlistMovies) {
      return this.currWatchlistMovies[this.watchlistType].findIndex(movie => movie.id === movieId) > -1 ? 'primary' : 'medium';
    }
    return 'medium';
  }

  onLoad() {
    // setTimeout(() => this.url = 'https://image.tmdb.org/t/p/original', 2000);
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

  addToWatchlist(movieId: number, index: number) {
    this.bookmarkIndex = index;
    const type = this.watchlistType === 'watchlistMovies' ?
      this._movieDetailsService.findDetailsById(movieId) :
      this._movieDetailsService.findAllTvDetails(movieId);
    type.subscribe(data => {
      let allGenres = '';
      if (this.watchlistType === 'watchlistMovies') {
        this._genresService.genresList
          .subscribe(serviceGenres => {
            allGenres = serviceGenres.genres.filter(genre => data.genres.some(genreId => genreId.id === genre.id)).map(g => g.name).join(' | ');
          });
      } else {
        this._genresService.genresTvList
          .subscribe(serviceGenres => {
            allGenres = serviceGenres.genres.filter(genre => data.genres.some(genreId => genreId.id === genre.id)).map(g => g.name).join(' | ');
          });
      }

      const movie = new Watchlist(
        data.id, data.title, data.name, data.poster_path, allGenres, data.omdbDetails.Released, data.omdbDetails.Actors, this.watchlistType
      );
      let currWatchlist = { watchlistMovies: [], watchlistTvShows: [] };
      this._nativeStorage.keys().then(resKeys => {
        if (resKeys.includes('movies')) {
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
          const value = this.watchlistType === 'watchlistMovies' ?
            { watchlistMovies: [ movie ], watchlistTvShows: [] } :
            { watchlistMovies: [], watchlistTvShows: [ movie ] };
          this._nativeStorage.setItem('movies', value).then(res => {
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
    const title = this.watchlistType === 'watchlistMovies' ? movie.title : movie.name;
    this.onShowToast(`"${title}" ${this.hasBeenAddedToWatchlist}`);
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
