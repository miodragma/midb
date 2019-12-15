import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailsInfoView } from './views/details-info/details-info.view';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

const pages = [];

const views = [ DetailsInfoView ];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  PipesModule,
  TranslateModule.forChild()
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class DetailsInfoModule {
}
