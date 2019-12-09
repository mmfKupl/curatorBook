import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelsPageComponent } from './models-page/models-page.component';
import { PageComponent } from './page/page.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'models',
    component: ModelsPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '**',
        component: PageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelControlRoutingModule {}
