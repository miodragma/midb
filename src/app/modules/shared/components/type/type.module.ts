import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TypeView } from './view/type.view';

const pages = [];

const views = [ TypeView ];

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
export class TypeModule {
}
