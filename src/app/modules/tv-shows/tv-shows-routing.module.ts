import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvShowsPage } from './pages/tv-shows/tv-shows.page';

const routes: Routes = [
  {
    path: '',
    component: TvShowsPage
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TvShowsRoutingModule {
}
