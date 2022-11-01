import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LegalPage } from './legal.page';

import { LegalPageRoutingModule } from './legal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegalPageRoutingModule
  ],
  declarations: [LegalPage]
})
export class LegalPageModule {}
