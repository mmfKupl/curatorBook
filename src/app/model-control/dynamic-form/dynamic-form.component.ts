import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormType } from '../../models/form-type';
import { FormGroup } from '@angular/forms';
import { MAT_DATE_LOCALE, MatSelect } from '@angular/material';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DatabaseService } from '../../database.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { OptionValue } from '../../models/option-value';

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
  @Input() initDownload: boolean;

  currentOptions$ = new BehaviorSubject<any[]>([]);
  isOptionsDownloaded = false;

  showSpinner = false;

  constructor(private dbs: DatabaseService) {}

  async ngOnInit() {
    if (this.initDownload && this.formType.type === 'select') {
      await this.setOptinos();
    }
  }

  async openSelect(event: Event, elem: MatSelect) {
    this.setOptinos(event, elem);
  }

  async setOptinos(event?: Event, elem?: MatSelect) {
    if (!this.isOptionsDownloaded) {
      if (event) {
        event.preventDefault();
      }
      this.showSpinner = true;
      const data = await this.getOptions();
      this.currentOptions$.next(data);
      setTimeout(() => {
        if (elem) {
          elem.open();
        }
        this.showSpinner = false;
      });
      this.isOptionsDownloaded = true;
      return;
    }
  }

  async getOptions() {
    if (typeof this.formType.options === 'string') {
      return (await this.dbs.getList(this.formType.options, false)).map(
        elem => {
          return this.dbs.getOptionData(this.formType.options as string, elem);
        }
      );
    }
    return this.formType.options.map(option => ({
      value: option,
      text: option
    }));
  }
}
