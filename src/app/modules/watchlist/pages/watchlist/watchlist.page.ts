import { Component } from '@angular/core';
import { AlertController, IonItemSliding, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'watchlist.page.html',
  styleUrls: [ 'watchlist.page.scss' ]
})
export class WatchlistPage {

  watchlist = { watchlistMovies: [], watchlistTvShows: [] };
  currMovies = { watchlistMovies: [], watchlistTvShows: [] };

  confirm = '';
  areYouSureThatYouWantToDelete = '';
  cancel = '';
  delete = '';
  successfullyDeleted = '';

  constructor(
    private _nativeStorage: NativeStorage,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    private _translate: TranslateService) {
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

    this._translate.get('labels.confirm').subscribe(text => this.confirm = text);
    this._translate.get('labels.are_you_sure_that_you_want_to_delete?').subscribe(text => this.areYouSureThatYouWantToDelete = text);
    this._translate.get('labels.cancel').subscribe(text => this.cancel = text);
    this._translate.get('labels.delete').subscribe(text => this.delete = text);
    this._translate.get('labels.successfully_deleted').subscribe(text => this.successfullyDeleted = text);
  }

  onRemoveMovie(type: string, id, slidingEl: IonItemSliding) {
    const currMovie = this.watchlist[type].find(movie => movie.id === id);
    this._alertCtrl.create({
      header: this.confirm,
      subHeader: `${currMovie.title}`,
      message: this.areYouSureThatYouWantToDelete,
      buttons: [
        {
          text: this.cancel,
          role: 'cancel',
          cssClass: 'cancelButton',
          handler: () => {
            slidingEl.close();
          }
        },
        {
          text: this.delete,
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
                  message: this.successfullyDeleted,
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
