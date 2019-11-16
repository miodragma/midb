import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Watchlist } from '../../models/watchlist.model';

@Component({
  templateUrl: 'watchlist.page.html',
  styleUrls: [ 'watchlist.page.scss' ]
})
export class WatchlistPage implements OnInit {

  watchlist: Watchlist[] = [];
  currMovies = { watchlist: [], reminder: [] };

  constructor(
    private nativeStorage: NativeStorage,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  ngOnInit() {
    // this.watchlist = [
    //   {id: 420817, poster: 'poster', releaseDate: 'date', genre: 'genre', title: 'aladin'},
    //   {id: 2331, poster: 'poster', releaseDate: 'date', genre: 'genre', title: 'friends'},
    //   {id: 994327, poster: 'poster', releaseDate: 'date', genre: 'genre', title: 'titanic'}
    // ];

    this.nativeStorage.getItem('movies')
      .then(res => {
        this.watchlist = res.watchlist;
        this.currMovies = res;
      });
  }

  onRemoveMovie(id, slidingEl: IonItemSliding) {
    const currMovie = this.watchlist.find(movie => movie.id === id);
    this.alertCtrl.create({
      header: 'Confirm!',
      subHeader: `${currMovie.title}`,
      message: `Are you sure that you want to delete this movie?`,
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
            updatedMovies.watchlist = updatedMovies.watchlist.filter(movie => movie.id !== id);
            this.nativeStorage.setItem('movies', updatedMovies)
              .then(res => {
                this.watchlist = [ ...this.watchlist ].filter(movie => movie.id !== id);
                this.currMovies = updatedMovies;
                this.toastCtrl.create({
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
