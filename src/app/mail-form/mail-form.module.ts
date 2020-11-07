import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailFormPageRoutingModule } from './mail-form-routing.module';

import { MailFormPage } from './mail-form.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MailFormPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [MailFormPage]
})
export class MailFormPageModule {}
