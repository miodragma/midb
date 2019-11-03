import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsModule) },
  { path: 'filter', loadChildren: () => import('./modules/filter/filter.module').then(f => f.FilterModule) },
  { path: 'details/movie', loadChildren: () => import('./modules/movie-details/movie-details.module').then(md => md.MoviesModule) },
  { path: 'details/tv-shows', loadChildren: () => import('./modules/tv-details/tv-details.module').then(tvd => tvd.TvDetailsModule) },
  {
    path: 'details/celebrities',
    loadChildren: () => import('./modules/celebrities-details/celebrities-details.module').then(cd => cd.CelebritiesDetailsModule)
  },
  { path: 'watchlist', loadChildren: () => import('./modules/watchlist/watchlist.module').then(wm => wm.WatchlistModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
