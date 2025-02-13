import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPage } from './pages/details/details.page';

const routes: Routes = [
  {
    path: ':id',
    component: DetailsPage
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TvDetailsRoutingModule {
}
