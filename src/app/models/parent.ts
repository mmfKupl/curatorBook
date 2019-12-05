import { SexType, forbiddenNameValidator, SexTypeRegExp } from './sex.type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
import { FormType } from './form-type';
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

  static getTypes(): FormType[] {
    return [
      {
        key: 'IDParent',
        type: 'number'
      },
      {
        key: 'Citizenship',
        type: 'text',
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
        key: 'Patronymic',
        type: 'text',
        validators: required
      },
      {
        key: 'Sex',
        type: 'select',
        options: ['М', 'Ж'],
        validators: required
      },
      {
        key: 'WorkPlace',
        type: 'text',
        validators: required
      },
      {
        key: 'WorkPosition',
        type: 'text',
        validators: required
      },
      {
        key: 'PhoneNumber1',
        type: 'tel',
        validators: required
      },
      {
        key: 'PhoneNumber2',
        type: 'tel'
      }
    ];
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
