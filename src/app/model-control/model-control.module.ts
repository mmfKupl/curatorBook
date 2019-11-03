import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelControlRoutingModule } from './model-control-routing.module';
import { ModelsPageComponent } from './models-page/models-page.component';

@NgModule({
  declarations: [ModelsPageComponent],
  imports: [CommonModule, ModelControlRoutingModule]
})
export class ModelControlModule {}
