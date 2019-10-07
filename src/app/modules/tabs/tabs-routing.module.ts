import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';
// { path: 'tabs', loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsModule) },

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'movies',
        children: [
          {
            path: '', loadChildren: () => import('../movies/movies.module').then(m => m.MoviesModule)
          }
        ]
      },
      {
        path: 'tv-shows',
        children: [
          {
            path: '', loadChildren: () => import('../tv-shows/tv-shows.module').then(m => m.TvShowsModule)
          },
        ]
      },
      {
        path: 'celebrities',
        children: [
          {
            path: '', loadChildren: () => import('../celebrities/celebrities.module').then(m => m.CelebritiesModule)
          },
        ]
      },
      //   {
      //     path: '',
      //     redirectTo: '/tabs/tab/celebrities',
      //     pathMatch: 'full'
      //   }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab/celebrities',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TabsRoutingModule {
}
