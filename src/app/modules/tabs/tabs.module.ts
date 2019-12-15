import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsRoutingModule } from './tabs-routing.module';
import { TabsPage } from './pages/tabs/tabs.page';
import { TranslateModule } from '@ngx-translate/core';

const pages = [ TabsPage ];

const views = [];

const services = [];

const modules = [
  CommonModule,
  IonicModule,
  TabsRoutingModule,
  TranslateModule.forChild()
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  providers: [ ...services ]
})
export class TabsModule {
}
