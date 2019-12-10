import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { AuthGuard } from '../auth.guard';
import { SPCharacteristicComponent } from './spcharacteristic/spcharacteristic.component';
import { SGAssetsComponent } from './sgassets/sgassets.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'student-list',
        component: StudentsListComponent
      },
      {
        path: 'sp-characteristic',
        component: SPCharacteristicComponent
      },
      {
        path: 'sg-assets',
        component: SGAssetsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {}
