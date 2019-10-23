import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsModule) },
  { path: 'filter', loadChildren: () => import('./modules/filter/filter.module').then(f => f.FilterModule) },
  { path: 'details/movie', loadChildren: () => import('./modules/movie-details/movie-details.module').then(md => md.MoviesModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
