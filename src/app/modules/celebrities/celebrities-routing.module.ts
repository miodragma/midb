import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelebritiesPage } from './pages/celebrities/celebrities.page';

const routes: Routes = [
  {
    path: '',
    component: CelebritiesPage
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CelebritiesRoutingModule {
}
