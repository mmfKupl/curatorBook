import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
import { FormType } from './form-type';
import { Moment, isMoment } from 'moment';
import * as moment from 'moment';
const required = Validators.required;

export class StudyGroup extends BaseModel {
  constructor(
    public IDStudyGroup: number,
    public IDEmployee: number,
    public GroupNumber: string,
    public Specialty: string,
    public DateOfFormation: Date & Moment
  ) {
    super();
  }

  static getTypes(): FormType[] {
    return [
      {
        key: 'IDStudyGroup',
        type: 'number'
      },
      {
        key: 'IDEmployee',
        type: 'select',
        options: 'Employee',
        validators: required
      },
      {
        key: 'GroupNumber',
        type: 'text',
        validators: required
      },
      {
        key: 'Specialty',
        type: 'text',
        validators: required
      },
      {
        key: 'DateOfFormation',
        type: 'date',
        validators: required
      }
    ];
  }

  static getFromFormGroup({
    IDStudyGroup,
    IDEmployee,
    GroupNumber,
    Specialty,
    DateOfFormation
  }: any): StudyGroup {
    return new StudyGroup(
      IDStudyGroup,
      IDEmployee,
      GroupNumber,
      Specialty,
      DateOfFormation
    );
  }
}
