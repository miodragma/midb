import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SimilarListView } from './views/similar-list/similar-list.view';

const pages = [];

const views = [ SimilarListView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class SimilarModule {
}
