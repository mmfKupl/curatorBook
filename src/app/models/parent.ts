import { SexType, forbiddenNameValidator, SexTypeRegExp } from './sex.type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
const required = Validators.required;

export class Parent extends BaseModel {
  constructor(
    public IDParent: number,
    public Citizenship: string,
    public Surname: string,
    public Name: string,
    public Patronymic: string,
    public Sex: SexType,
    public WorkPlace: string,
    public WorkPosition: string,
    public PhoneNumber1: string,
    public PhoneNumber2: string
  ) {
    super();
  }

  static getFormGroup() {
    return new FormGroup({
      IDParent: new FormControl(),
      Citizenship: new FormControl('', required),
      Surname: new FormControl('', required),
      Name: new FormControl('', required),
      Patronymic: new FormControl('', required),
      Sex: new FormControl('', [
        required,
        forbiddenNameValidator(SexTypeRegExp)
      ]),
      WorkPlace: new FormControl('', required),
      WorkPosition: new FormControl('', required),
      PhoneNumber1: new FormControl('', required),
      PhoneNumber2: new FormControl('', required)
    });
  }

  static getFromFormGroup({
    IDParent,
    Citizenship,
    Surname,
    Name,
    Patronymic,
    Sex,
    WorkPlace,
    WorkPosition,
    PhoneNumber1,
    PhoneNumber2
  }: any): Parent {
    return new Parent(
      IDParent,
      Citizenship,
      Surname,
      Name,
      Patronymic,
      Sex,
      WorkPlace,
      WorkPosition,
      PhoneNumber1,
      PhoneNumber2
    );
  }
}
