import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WatchlistPage } from './pages/watchlist/watchlist.page';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

const pages = [];

const views = [ WatchlistPage ];

const services = [ NativeStorage ];

const modules = [
  CommonModule,
  IonicModule,
  WatchlistRoutingModule
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...pages, ...views ],
  exports: [ ...views ],
  providers: [ ...services ]
})
export class WatchlistModule {
}
