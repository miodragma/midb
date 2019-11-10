import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeasonsListPage } from './pages/seasons-list/seasons-list.page';
import { EpisodesListPage } from './pages/episodes-list/episodes-list.page';

const routes: Routes = [
  {
    path: ':id',
    component: SeasonsListPage
  },
  {
    path: ':seasonId/:id',
    component: EpisodesListPage
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SeasonsRoutingModule {
}
