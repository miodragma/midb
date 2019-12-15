import { Component } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';
import { filter, map } from 'rxjs/operators';

@Component({
  templateUrl: 'settings.page.html',
  styleUrls: [ 'settings.page.scss' ]
})
export class SettingsPage {

  language: string;

  constructor(
    private _languageService: LanguageService) {
  }

  ionViewWillEnter() {
    this._languageService.selected
      .pipe(
        filter(lng => !!lng),
        map(lng => {
          this.language = this._languageService.getLanguages().find(lang => lang.value === lng).text;
        })
      ).subscribe();
  }

}
