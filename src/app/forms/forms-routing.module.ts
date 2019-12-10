import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { AuthGuard } from '../auth.guard';
import { SPCharacteristicComponent } from './spcharacteristic/spcharacteristic.component';
import { SGAssetsComponent } from './sgassets/sgassets.component';
import {AchivesComponent} from './achives/achives.component';
import {LivesComponent} from './lives/lives.component';
import {CardComponent} from './card/card.component';
import {RecomendationComponent} from './recomendation/recomendation.component';
import {VisitsComponent} from './visits/visits.component';
import {VisitsformsComponent} from './visitsforms/visitsforms.component';

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
      },
      {
        path: 'ac-group',
        component: AchivesComponent
      },
      {
        path: 'groups-lives',
        component: LivesComponent
      },
      {
        path: 'card',
        component: CardComponent
      },
      {
        path: 'recommendation',
        component: RecomendationComponent
      },
      {
        path: 'visits',
        component: VisitsComponent
      },
      {
        path: 'visits-forms',
        component: VisitsformsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {}
