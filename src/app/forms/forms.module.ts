import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { StudentsListComponent } from './students-list/students-list.component';
import {
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatInputModule
} from '@angular/material';
import { SPCharacteristicComponent } from './spcharacteristic/spcharacteristic.component';
import { SGAssetsComponent } from './sgassets/sgassets.component';

@NgModule({
  declarations: [StudentsListComponent, SPCharacteristicComponent, SGAssetsComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AppFormsModule {}
