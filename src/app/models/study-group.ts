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
    public IDHeadman: number,
    public IDDeputyHeadman: number,
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
        key: 'IDHeadman',
        type: 'select',
        options: 'Student'
      },
      {
        key: 'IDDeputyHeadman',
        type: 'select',
        options: 'Student'
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
    IDHeadman,
    IDDeputyHeadman,
    GroupNumber,
    Specialty,
    DateOfFormation
  }: any): StudyGroup {
    return new StudyGroup(
      IDStudyGroup,
      IDEmployee,
      IDHeadman,
      IDDeputyHeadman,
      GroupNumber,
      Specialty,
      DateOfFormation
    );
  }
}
