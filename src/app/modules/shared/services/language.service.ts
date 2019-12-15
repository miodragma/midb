import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _selected = new BehaviorSubject<string>('');

  constructor(private _translate: TranslateService, private _nativeStorage: NativeStorage, private _alertCtrl: AlertController) {
  }

  get selected() {
    return this._selected.asObservable();
  }

  setInitialAppLanguage() {
    const language = this._translate.getBrowserLang();
    this._translate.setDefaultLang(language);
    this._selected.next(language);
    this._nativeStorage.keys().then(keys => {
      if (keys.includes('language')) {
        this._nativeStorage.getItem('language')
          .then(res => {
            this._selected.next(res.language);
            this._translate.use(res.language);
          });
      } else {
        this._nativeStorage.setItem('language', { language })
          .then(console.log);
      }
    }).catch(error => console.log(error));

  }

  getLanguages() {
    return [
      { text: 'English', value: 'en', flag: './assets/flags/en.png' },
      { text: 'German', value: 'de', flag: './assets/flags/de.png' }
    ];
  }

  setLanguage(lng: string) {
    this._translate.use(lng);
    this._selected.next(lng);
    this._nativeStorage.setItem('language', { language: lng })
      .then(console.log);
  }

}
