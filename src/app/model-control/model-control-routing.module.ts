import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelsPageComponent } from './models-page/models-page.component';

const routes: Routes = [
  {
    path: 'models',
    component: ModelsPageComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelControlRoutingModule {}
