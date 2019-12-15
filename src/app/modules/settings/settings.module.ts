import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SettingsPage } from './pages/settings/settings.page';
import { SettingsRoutingModule } from './settings-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagesPage } from './pages/languages/languages.page';

const pages = [ SettingsPage, LanguagesPage ];

const views = [];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  SettingsRoutingModule,
  TranslateModule.forChild()
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class SettingsModule {
}
