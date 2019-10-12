import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material';

const MATERIAL_MODULES = [
  MatExpansionModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class FilterMaterialModule {

}
