import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Watchlist } from '../../../../../watchlist/interfaces/watchlist.model';

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
    this.movie = new Watchlist(id, original_title, poster_path, omdbDetails.Genre, omdbDetails.Released, omdbDetails.Actors);
  }

  onAddToWatchList() {
    let currWatchlist = { watchlist: [], reminder: [] };
    this._nativeStorage.keys().then(resKeys => {
      if (resKeys[0] === 'movies') {
        this._nativeStorage.getItem('movies')
          .then(res => {
            currWatchlist = res;
            if (currWatchlist.watchlist.some(item => item.id === this.movie.id)) {
              this.onShowToast(`${this.movie.title} is already in Watchlist!`);
            } else {
              currWatchlist.watchlist.push(this.movie);
              this._nativeStorage.setItem('movies', currWatchlist)
                .then(ress => {
                  this.onShowToast(`${this.movie.title} has been added to Watchlist!`);
                });
            }
          });
      } else {
        this._nativeStorage.setItem('movies', { watchlist: [ this.movie ], reminder: [] })
          .then(res => {
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

}
