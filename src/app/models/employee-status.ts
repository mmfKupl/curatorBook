import { BaseModel } from './base-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormType } from './form-type';
const required = Validators.required;

export class EmployeeStatus extends BaseModel {
  constructor(public IDEmployeeStatus: number, public Name: string) {
    super();
  }

  static getTypes(): FormType[] {
    return [
      {
        key: 'IDEmployeeStatus',
        type: 'number'
      },
      {
        key: 'Name',
        type: 'text',
        validators: required
      }
    ];
  }

  static getFromFormGroup({ IDEmployeeStatus, Name }: any): EmployeeStatus {
    return new EmployeeStatus(IDEmployeeStatus, Name);
  }
}
