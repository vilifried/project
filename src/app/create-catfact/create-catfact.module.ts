import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCatfactPageRoutingModule } from './create-catfact-routing.module';

import { CreateCatfactPage } from './create-catfact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCatfactPageRoutingModule
  ],
  declarations: [CreateCatfactPage]
})
export class CreateCatfactPageModule {}
