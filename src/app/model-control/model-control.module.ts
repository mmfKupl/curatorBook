import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelControlRoutingModule } from './model-control-routing.module';
import { ModelsPageComponent } from './models-page/models-page.component';
import {
  MatInputModule,
  MatTabsModule,
  MatTableModule,
  MatSidenavModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateKeysPipe } from './translate-keys.pipe';
import { PageComponent } from './page/page.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    ModelsPageComponent,
    TranslateKeysPipe,
    PageComponent,
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModelControlRoutingModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSelectModule
  ]
})
export class ModelControlModule {}
