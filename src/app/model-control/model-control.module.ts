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
  MatCheckboxModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateKeysPipe } from './translate-keys.pipe';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [ModelsPageComponent, TranslateKeysPipe, PageComponent],
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
    MatCheckboxModule
  ]
})
export class ModelControlModule {}
