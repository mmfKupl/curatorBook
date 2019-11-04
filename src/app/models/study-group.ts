import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
import { FormType } from './form-type';
const required = Validators.required;

export class StudyGroup extends BaseModel {
  constructor(
    public IDStudyGroup: number,
    public IDEmployee: number,
    public GroupNumber: string,
    public Specialty: string,
    public DateOfFormation: Date
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
        type: 'number',
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
