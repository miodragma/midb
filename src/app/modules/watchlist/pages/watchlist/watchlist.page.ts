import { Component } from '@angular/core';
import { AlertController, IonItemSliding, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  templateUrl: 'watchlist.page.html',
  styleUrls: [ 'watchlist.page.scss' ]
})
export class WatchlistPage {

  watchlist = { watchlistMovies: [], watchlistTvShows: [] };
  currMovies = { watchlistMovies: [], watchlistTvShows: [] };

  constructor(
    private _nativeStorage: NativeStorage,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    // this.watchlist = {watchlistMovies: [
    //     {id: 420817, poster: 'poster', releaseDate: 'date', genre: 'genre', title: 'aladin', type: 'watchlistMovies'},
    //     {id: 2331, poster: 'poster', releaseDate: 'date', genre: 'genre', title: 'friends', type: 'watchlistMovies'},
    //     {id: 994327, poster: 'poster', releaseDate: 'date', genre: 'genre', title: 'titanic', type: 'watchlistMovies'}
    //   ], watchlistTvShows: []};

    this._nativeStorage.getItem('movies')
      .then(res => {
        this.watchlist = res;
        this.currMovies = res;
      });
  }

  onRemoveMovie(type: string, id, slidingEl: IonItemSliding) {
    const currMovie = this.watchlist[type].find(movie => movie.id === id);
    this._alertCtrl.create({
      header: 'Confirm!',
      subHeader: `${currMovie.title}`,
      message: `Are you sure that you want to delete?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancelButton',
          handler: () => {
            slidingEl.close();
          }
        },
        {
          text: 'Delete',
          cssClass: 'deleteButton',
          handler: () => {
            slidingEl.close();
            const updatedMovies = { ...this.currMovies };
            updatedMovies[type] = updatedMovies[type].filter(movie => movie.id !== id);
            this._nativeStorage.setItem('movies', updatedMovies)
              .then(res => {
                this.watchlist[type] = { ...this.watchlist }[type].filter(movie => movie.id !== id);
                this.currMovies = updatedMovies;
                this._toastCtrl.create({
                  message: 'Successfully deleted!',
                  duration: 2000
                })
                  .then(toastEl => {
                    toastEl.present();
                  });
              });
          }
        }
      ]
    })
      .then(alertEl => alertEl.present());
  }
}
