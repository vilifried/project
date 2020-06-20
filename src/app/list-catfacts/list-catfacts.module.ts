import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCatfactsPageRoutingModule } from './list-catfacts-routing.module';

import { ListCatfactsPage } from './list-catfacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCatfactsPageRoutingModule
  ],
  declarations: [ListCatfactsPage]
})
export class ListCatfactsPageModule {}
