import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ResultsPage } from './results.page';

import { ResultsPageRoutingModule } from './results-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsPageRoutingModule
  ],
  declarations: [ResultsPage]
})
export class ResultsPageModule {}
