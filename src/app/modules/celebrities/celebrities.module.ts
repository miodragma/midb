import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CelebritiesRoutingModule } from './celebrities-routing.module';
import { CelebritiesPage } from './pages/celebrities/celebrities.page';

const pages = [ CelebritiesPage ];

const views = [];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  CelebritiesRoutingModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class CelebritiesModule {
}
