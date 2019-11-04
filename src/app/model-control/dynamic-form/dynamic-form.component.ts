import { Component, OnInit, Input } from '@angular/core';
import { FormType } from '../../models/form-type';
import { FormGroup } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-Ru' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input() formType: FormType;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit() {}
}
