import { BaseModel } from './base-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  static getFormGroup() {
    return new FormGroup({
      IDEmployee: new FormControl(),
      IDEmployeeStatus: new FormControl(0, required),
      Surname: new FormControl('', required),
      Name: new FormControl('', required),
      Patronymic: new FormControl('', required),
      PhoneNumber: new FormControl('', required)
    });
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
