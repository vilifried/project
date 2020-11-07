import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailFormPage } from './mail-form.page';

const routes: Routes = [
  {
    path: '',
    component: MailFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailFormPageRoutingModule {}
