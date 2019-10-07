import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule) },
  // { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule' },
  // { path: 'watchlist', loadChildren: './pages/watchlist/watchlist.module#WatchlistPageModule' },
  // { path: 'tv-details', loadChildren: './pages/tv-details/tv-details.module#TvDetailsPageModule' },
  // { path: 'seasons', loadChildren: './pages/seasons/seasons.module#SeasonsPageModule' },
  // { path: 'celbs', loadChildren: './pages/celbs/celbs.module#CelbsPageModule' },
  // { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
