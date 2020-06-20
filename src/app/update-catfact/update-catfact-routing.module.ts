import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCatfactPage } from './update-catfact.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCatfactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCatfactPageRoutingModule {}
