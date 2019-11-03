import { SexType } from './sex.type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
const required = Validators.required;

export class Student extends BaseModel {
  constructor(
    public IDStudent: number,
    public IDTown: number,
    public IDParent1: number,
    public IDParent2: number,
    public Citizenship: string,
    public Surname: string,
    public Name: string,
    public Patronymic: string,
    public Sex: SexType,
    public DateOfBirth: Date,
    public PlaceOfResidence: string,
    public AddresOfResidence: string,
    public PhoneNumber: string
  ) {
    super();
  }

  static getFormGroup() {
    return new FormGroup({
      IDStudent: new FormControl(0, required),
      IDTown: new FormControl(0, required),
      IDParent1: new FormControl(0, required),
      IDParent2: new FormControl(0, required),
      Citizenship: new FormControl('', required),
      Surname: new FormControl('', required),
      Name: new FormControl('', required),
      Patronymic: new FormControl('', required),
      Sex: new FormControl('М', required),
      DateOfBirth: new FormControl(new Date(), required),
      PlaceOfResidence: new FormControl('', required),
      AddresOfResidence: new FormControl('', required),
      PhoneNumber: new FormControl('', required)
    });
  }

  static getFromFormGroup({
    IDStudent,
    IDTown,
    IDParent1,
    IDParent2,
    Citizenship,
    Surname,
    Name,
    Patronymic,
    Sex,
    DateOfBirth,
    PlaceOfResidence,
    AddresOfResidence,
    PhoneNumber
  }: any): Student {
    return new Student(
      IDStudent,
      IDTown,
      IDParent1,
      IDParent2,
      Citizenship,
      Surname,
      Name,
      Patronymic,
      Sex,
      DateOfBirth,
      PlaceOfResidence,
      AddresOfResidence,
      PhoneNumber
    );
  }
}
