import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Watchlist } from '../../../../../watchlist/models/watchlist.model';
import { NotificationModel } from '../../../../models/notification.model';
import { CreateNotificationView } from '../../../notification/create-notification.view';
import { TranslateService } from '@ngx-translate/core';
import { GenresService } from '../../../../services/genres.service';

@Component({
  templateUrl: 'popover-list.view.html',
  styleUrls: [ 'popover-list.view.scss' ]
})
export class PopoverListView implements OnInit {

  pop: PopoverController;
  movie: Watchlist;
  type: string;

  isAlreadyInWatchlist = '';
  hasBeenAddedToWatchlist = '';

  constructor(
    private _navParams: NavParams,
    private _nativeStorage: NativeStorage,
    private _toastCtrl: ToastController,
    private _actionSheetCtrl: ActionSheetController,
    private _modalCtrl: ModalController,
    private _translate: TranslateService,
    private _genresService: GenresService) {
  }

  ngOnInit() {
    this.pop = this._navParams.get('popoverController');
    const { id, title, name, poster_path, omdbDetails, genres } = this._navParams.data.movie;
    const type = this._navParams.data.type;
    this.type = type;

    let allGenres = '';
    if (type === 'watchlistMovies') {
      this._genresService.genresList
        .subscribe(serviceGenres => {
          allGenres = serviceGenres.genres.filter(genre => genres.some(genreId => genreId.id === genre.id)).map(g => g.name).join(' | ');
        });
    } else {
      this._genresService.genresTvList
        .subscribe(serviceGenres => {
          allGenres = serviceGenres.genres.filter(genre => genres.some(genreId => genreId.id === genre.id)).map(g => g.name).join(' | ');
        });
    }

    this.movie = new Watchlist(id, title, name, poster_path, allGenres, omdbDetails.Released, omdbDetails.Actors, type);

    this._translate.get('labels.is_already_in_watchlist!').subscribe(text => this.isAlreadyInWatchlist = text);
    this._translate.get('labels.has_been_added_to_watchlist!').subscribe(text => this.hasBeenAddedToWatchlist = text);
  }

  onAddToWatchList() {
    const title = this.type === 'watchlistMovies' ? this.movie.title : this.movie.name;
    let currWatchlist = { watchlistMovies: [], watchlistTvShows: [] };
    this._nativeStorage.keys().then(resKeys => {
      if (resKeys.includes('movies')) {
        this._nativeStorage.getItem('movies')
          .then(res => {
            currWatchlist = res;
            if (currWatchlist[this.type].some(item => item.id === this.movie.id)) {
              this.onShowToast(`"${title}" ${this.isAlreadyInWatchlist}`);
            } else {
              currWatchlist[this.type].push(this.movie);
              this._nativeStorage.setItem('movies', currWatchlist)
                .then(ress => {
                  this.onShowToast(`"${title}" ${this.hasBeenAddedToWatchlist}`);
                });
            }
          });
      } else {
        const value = this.type === 'watchlistMovies' ?
          { watchlistMovies: [ this.movie ], watchlistTvShows: [] } :
          { watchlistMovies: [], watchlistTvShows: [ this.movie ] };
        this._nativeStorage.setItem('movies', value).then(res => {
          this.onShowToast(`"${title}" ${this.hasBeenAddedToWatchlist}`);
        });
      }
    })
      .catch(error => {
        this.onShowToast(`Error ${error}!`);
      });
    this.pop.dismiss();
  }

  onShowToast(newMessage) {
    this._toastCtrl.create({
      message: newMessage,
      duration: 2000
    })
      .then(toastEl => toastEl.present());
  }

  onAddNotification() {
    this.pop.dismiss();
    const currentDate = Math.floor(new Date().getTime() / 1000.0);
    const movieReleaseDate = new Date(this.movie.releaseDate).getTime() / 1000.0;
    const isUpcoming = movieReleaseDate > currentDate;
    const releaseButton = isUpcoming ? {
      text: 'Use Release Date',
      handler: () => {
        this.openNotificationModal('release');
      }
    } : null;
    const buttons = [
      {
        text: 'Select Date',
        handler: () => {
          this.openNotificationModal('select');
        }
      },
      releaseButton,
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ];
    this._actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: buttons.filter(button => button !== null)
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  openNotificationModal(mode: 'release' | 'select') {
    const newMovie = new NotificationModel(
      this.movie.id,
      this.movie.title,
      this.movie.poster,
      this.movie.genre,
      this.movie.releaseDate,
      this.movie.actors
    );
    this._modalCtrl.create({
      component: CreateNotificationView,
      componentProps: { movie: newMovie, currMode: mode }
    })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'success') {
          this._toastCtrl.create({
            message: 'The notification has been created!',
            duration: 2000
          })
            .then(toastEl => toastEl.present());
        }
      });
  }

}
