import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsRoutingModule} from './forms-routing.module';
import {StudentsListComponent} from './students-list/students-list.component';
import {
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatInputModule, MatDividerModule, MatSelectModule
} from '@angular/material';
import {SPCharacteristicComponent} from './spcharacteristic/spcharacteristic.component';
import {SGAssetsComponent} from './sgassets/sgassets.component';
import {CardComponent} from './card/card.component';
import {LivesComponent} from './lives/lives.component';
import {AchivesComponent} from './achives/achives.component';
import {FormsModule} from '@angular/forms';
import {TranslateKeysPipe} from '../model-control/translate-keys.pipe';
import {ModelControlModule} from '../model-control/model-control.module';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { VisitsComponent } from './visits/visits.component';
import { VisitsformsComponent } from './visitsforms/visitsforms.component';

@NgModule({
  declarations: [
    StudentsListComponent,
    SPCharacteristicComponent,
    SGAssetsComponent,
    CardComponent,
    LivesComponent,
    AchivesComponent,
    RecomendationComponent,
    VisitsComponent,
    VisitsformsComponent,
    ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    ModelControlModule
  ]
})
export class AppFormsModule {
}
