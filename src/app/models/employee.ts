import { BaseModel } from './base-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormType } from './form-type';
const required = Validators.required;

export class Employee extends BaseModel {
  constructor(
    public IDEmployee: number,
    public IDEmployeeStatus: number,
    public Surname: string,
    public Name: string,
    public Patronymic: string,
    public PhoneNumber: string
  ) {
    super();
  }

  static getTypes(): FormType[] {
    return [
      {
        key: 'IDEmployee',
        type: 'number'
      },
      {
        key: 'IDEmployeeStatus',
        type: 'select',
        options: 'EmployeeStatus',
        validators: required
      },
      {
        key: 'Surname',
        type: 'text',
        validators: required
      },
      {
        key: 'Name',
        type: 'text',
        validators: required
      },
      {
        key: 'PhoneNumber',
        type: 'tel',
        validators: required
      }
    ];
  }

  static getFromFormGroup({
    IDEmployee,
    IDEmployeeStatus,
    Surname,
    Name,
    Patronymic,
    PhoneNumber
  }: any): Employee {
    return new Employee(
      IDEmployee,
      IDEmployeeStatus,
      Surname,
      Name,
      Patronymic,
      PhoneNumber
    );
  }
}
