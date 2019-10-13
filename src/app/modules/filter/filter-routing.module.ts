import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterPage } from './pages/filter.page';

const routes: Routes = [
  {
    path: '',
    component: FilterPage
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class FilterRoutingModule {
}
