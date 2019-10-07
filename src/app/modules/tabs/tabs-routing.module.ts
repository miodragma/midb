import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    // children: [
    //   {
    //     path: 'movies',
    //     children: [
    //       {
    //         path: '',
    //         loadChildren: './movies/movies.module#MoviesPageModule'
    //       }
    //     ]
    //   },
    //   {
    //     path: 'tvShows',
    //     children: [
    //       {
    //         path: '',
    //         loadChildren: './tv-shows/tv-shows.module#TvShowsPageModule'
    //       },
    //     ]
    //   },
    //   {
    //     path: 'celebrities',
    //     children: [
    //       {
    //         path: '',
    //         loadChildren: './celebrities/celebrities.module#CelebritiesPageModule'
    //       },
    //     ]
    //   },
    //   {
    //     path: '',
    //     redirectTo: '/tabs/tab/movies',
    //     pathMatch: 'full'
    //   }
    // ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab/movies',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TabsRoutingModule {
}
