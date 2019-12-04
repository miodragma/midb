import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Watchlist } from '../../../../../watchlist/models/watchlist.model';
import { NotificationModel } from '../../../../models/notification.model';
import { CreateNotificationView } from '../../../notification/create-notification.view';

@Component({
  templateUrl: 'popover-list.view.html',
  styleUrls: [ 'popover-list.view.scss' ]
})
export class PopoverListView implements OnInit {

  pop: PopoverController;
  movie: Watchlist;

  constructor(
    private _navParams: NavParams,
    private _nativeStorage: NativeStorage,
    private _toastCtrl: ToastController,
    private _actionSheetCtrl: ActionSheetController,
    private _modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.pop = this._navParams.get('popoverController');
    const { id, original_title, poster_path, omdbDetails } = this._navParams.data.movie;
    this.movie = new Watchlist(id, original_title, poster_path, omdbDetails.Genre, omdbDetails.Released, omdbDetails.Actors, 'watchlistMovies');
  }

  onAddToWatchList() {
    let currWatchlist = { watchlistMovies: [], watchlistTvShows: [] };
    this._nativeStorage.keys().then(resKeys => {
      if (resKeys[0] === 'movies') {
        this._nativeStorage.getItem('movies')
          .then(res => {
            currWatchlist = res;
            if (currWatchlist.watchlistMovies.some(item => item.id === this.movie.id)) {
              this.onShowToast(`${this.movie.title} is already in Watchlist!`);
            } else {
              currWatchlist.watchlistMovies.push(this.movie);
              this._nativeStorage.setItem('movies', currWatchlist)
                .then(ress => {
                  this.onShowToast(`${this.movie.title} has been added to Watchlist!`);
                });
            }
          });
      } else {
        this._nativeStorage.setItem('movies', { watchlistMovies: [ this.movie ], watchlistTvShows: [] }).then(res => {
          this.onShowToast(`${this.movie.title} has been added to Watchlist!`);
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
