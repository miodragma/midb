import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController, NavParams } from '@ionic/angular';

import { NotificationModel } from '../../models/notification.model';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.view.html',
  styleUrls: [ './create-notification.view.scss' ],
})
export class CreateNotificationView implements OnInit {

  @Input() movie: NotificationModel;
  @ViewChild('date', { static: false }) date: IonDatetime;
  @ViewChild('time', { static: false }) time: IonDatetime;
  minTime: string;
  isAdded = false;
  isReleaseDate = false;
  releaseDate = '';

  constructor(
    private modalCtrl: ModalController,
    private localNotifications: LocalNotifications,
    private navParams: NavParams) {
  }

  pickerOption = {
    animated: false,
    mode: 'md'
  };

  ngOnInit() {
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, -1);
    const newDate = (new Date(new Date(this.navParams.data.movie.releaseDate).getTime() - tzOffset)).toISOString().slice(0, -1);
    if (this.navParams.data.currMode === 'release') {
      this.isReleaseDate = true;
      this.releaseDate = newDate;
    }
    this.minTime = localISOTime;
  }

  onSubmitMovie() {
    const newDate = new Date(this.date.value);
    const newTime = new Date(this.time.value);
    const dateYear = newDate.getFullYear();
    const dateMonth = newDate.getMonth();
    const dateDay = newDate.getDate();
    const timeHours = newTime.getHours();
    const timeMinutes = newTime.getMinutes();
    this.localNotifications.schedule({
      id: this.movie.id,
      badge: 1,
      title: `New in Theaters`,
      clock: true,
      color: '#f72664',
      text: `${this.movie.title} (${new Date(this.movie.releaseDate).getFullYear()}) ${String.fromCharCode(183)} ${this.movie.actors} ${String.fromCharCode(183)} ${this.movie.genre}`,
      icon: `https://image.tmdb.org/t/p/w200${this.movie.poster}`,
      actions: [ { id: 'yes', title: 'Add to Watchlist' }, { id: 'no', title: 'Cancel' } ],
      data: { movie: this.movie },
      // foreground: true
      trigger: {
        at: new Date(
          dateYear,
          dateMonth,
          dateDay,
          timeHours,
          timeMinutes
        )
      }
    });
    this.modalCtrl.dismiss(null, 'success');
  }

  isDateAdded() {
    this.isAdded = this.date.value !== undefined && this.time.value !== undefined;
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
