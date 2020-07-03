import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCatfactPageRoutingModule } from './update-catfact-routing.module';

import { UpdateCatfactPage } from './update-catfact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCatfactPageRoutingModule
  ],
  declarations: [UpdateCatfactPage]
})
export class UpdateCatfactPageModule {}
