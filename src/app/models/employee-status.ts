import { BaseModel } from './base-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
const required = Validators.required;

export type EmployeeType = 0 | 1 | 2;

export class EmployeeStatus extends BaseModel {
  constructor(public IDEmployeeStatus: number, public Type: EmployeeType) {
    super();
  }

  static getFormGroup() {
    return new FormGroup({
      IDEmployeeStatus: new FormControl(0, required),
      Type: new FormControl('', required)
    });
  }

  static getFromFormGroup({ IDEmployeeStatus, Type }: any): EmployeeStatus {
    return new EmployeeStatus(IDEmployeeStatus, Type);
  }
}
