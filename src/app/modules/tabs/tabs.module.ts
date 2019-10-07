import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsRoutingModule } from './tabs-routing.module';
import { TabsPage } from './pages/tabs/tabs.page';

const pages = [ TabsPage ];

const views = [];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  TabsRoutingModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class TabsPageModule {
}
