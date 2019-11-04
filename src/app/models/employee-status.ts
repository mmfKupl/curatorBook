import { BaseModel } from './base-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
const required = Validators.required;

export class EmployeeStatus extends BaseModel {
  constructor(
    public IDEmployeeStatus: number,
    public Type: number,
    public Name: string
  ) {
    super();
  }

  static getFormGroup() {
    return new FormGroup({
      IDEmployeeStatus: new FormControl(),
      Type: new FormControl('', required)
    });
  }

  static getFromFormGroup({
    IDEmployeeStatus,
    Type,
    Name
  }: any): EmployeeStatus {
    return new EmployeeStatus(IDEmployeeStatus, Type, Name);
  }
}
