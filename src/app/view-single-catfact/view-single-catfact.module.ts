import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSingleCatfactPageRoutingModule } from './view-single-catfact-routing.module';

import { ViewSingleCatfactPage } from './view-single-catfact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSingleCatfactPageRoutingModule
  ],
  declarations: [ViewSingleCatfactPage]
})
export class ViewSingleCatfactPageModule {}
