import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeasonsListPage } from './pages/seasons-list/seasons-list.page';
import { EpisodesListPage } from './pages/episodes-list/episodes-list.page';
import { EpisodeDetailsPage } from './pages/episode-details/episode-details.page';

const routes: Routes = [
  {
    path: 'episode-details/:showId/:seasonNumber/:episodeNumber',
    component: EpisodeDetailsPage
  },
  {
    path: ':id',
    component: SeasonsListPage
  },
  {
    path: ':seasonNumber/:id',
    component: EpisodesListPage
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SeasonsRoutingModule {
}
