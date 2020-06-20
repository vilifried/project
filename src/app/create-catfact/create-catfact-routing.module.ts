import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCatfactPage } from './create-catfact.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCatfactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCatfactPageRoutingModule {}
