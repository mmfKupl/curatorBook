import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { AuthGuard } from '../auth.guard';
import { SPCharacteristicComponent } from './spcharacteristic/spcharacteristic.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {}
