import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SearchView } from './views/search.view';
// import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

const pages = [];

const views = [ SearchView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class SearchModule {
}
