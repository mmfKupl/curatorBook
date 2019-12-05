import { SexType, forbiddenNameValidator, SexTypeRegExp } from './sex.type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
import { FormType } from './form-type';
import { Town } from './town';
import { DatabaseService } from '../database.service';
import { Moment } from 'moment';
import * as moment from 'moment';
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
    public DateOfBirth: Date & Moment,
    public PlaceOfResidence: string,
    public AddresOfResidence: string,
    public PhoneNumber: string
  ) {
    super();
  }

  static getTypes(): FormType[] {
    return [
      {
        key: 'IDStudent',
        type: 'number'
      },
      {
        key: 'IDTown',
        type: 'select',
        options: 'Town',
        validators: required
      },
      {
        key: 'IDParent1',
        type: 'select',
        options: 'Parent',
        validators: required
      },
      {
        key: 'IDParent2',
        type: 'select',
        options: 'Parent',
        validators: required
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
        key: 'DateOfBirth',
        type: 'date',
        validators: required
      },
      {
        key: 'PlaceOfResidence',
        type: 'text',
        validators: required
      },
      {
        key: 'AddresOfResidence',
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
