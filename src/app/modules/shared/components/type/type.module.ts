import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TypeView } from './views/type.view';
import { TranslateModule } from '@ngx-translate/core';

const pages = [];

const views = [ TypeView ];

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
export class TypeModule {
}
