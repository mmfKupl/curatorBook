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

@NgModule({
  declarations: [StudentsListComponent, SPCharacteristicComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AppFormsModule {}
