import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCatfactsPage } from './list-catfacts.page';

const routes: Routes = [
  {
    path: '',
    component: ListCatfactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCatfactsPageRoutingModule {}
