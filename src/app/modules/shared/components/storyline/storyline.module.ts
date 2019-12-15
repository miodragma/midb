import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StorylineView } from './views/storyline/storyline.view';
import { TranslateModule } from '@ngx-translate/core';

const pages = [];

const views = [ StorylineView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  TranslateModule.forChild()
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class StorylineModule {
}
