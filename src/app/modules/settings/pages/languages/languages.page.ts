import { Component } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';
import { NavController } from '@ionic/angular';
import { Language } from '../../interfaces/language.interface';
import { Observable } from 'rxjs';
import { GenresService } from '../../../shared/services/genres.service';

@Component({
  selector: 'languages',
  templateUrl: 'languages.page.html',
  styleUrls: [ 'languages.page.scss' ]
})
export class LanguagesPage {

  languages: Language[];
  currLanguage: Observable<string>;

  constructor(
    private _languageService: LanguageService,
    private _navCtrl: NavController,
    private _genresService: GenresService) {
  }

  ionViewWillEnter() {
    this.languages = this._languageService.getLanguages();
    this.currLanguage = this._languageService.selected;
  }

  selectLanguage(language: string) {
    this._languageService.setLanguage(language);
    this._genresService.findAllMovieGenres();
    this._genresService.findAllTVGenres();
  }

  navigate() {
    this._navCtrl.back();
  }

}
