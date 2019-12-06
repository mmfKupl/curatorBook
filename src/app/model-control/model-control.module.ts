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
  MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateKeysPipe } from './translate-keys.pipe';
import { PageComponent } from './page/page.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { IdNamePipe } from './id-name.pipe';

@NgModule({
  declarations: [
    ModelsPageComponent,
    TranslateKeysPipe,
    PageComponent,
    DynamicFormComponent,
    IdNamePipe
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
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class ModelControlModule {}
