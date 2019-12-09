import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
import { FormType } from './form-type';
const required = Validators.required;

export class Info extends BaseModel {
  constructor(
    public IDInfo: number,
    public IDStudent: number,
    public IDInfoCategory: number,
    public Course: number,
    public Semester: number,
    public TextData: string,
    public BoolData: boolean
  ) {
    super();
  }

  static getTypes(): FormType[] {
    return [
      {
        key: 'IDInfo',
        type: 'number'
      },
      {
        key: 'IDStudent',
        type: 'select',
        options: 'Student',
        validators: required
      },
      {
        key: 'IDInfoCategory',
        type: 'select',
        options: 'InfoCategory',
        validators: required
      },
      {
        key: 'Course',
        type: 'number',
        validators: required
      },
      {
        key: 'Semester',
        type: 'number',
        validators: required
      },
      {
        key: 'TextData',
        type: 'textarea'
      },
      {
        key: 'BoolData',
        type: 'checkbox'
      }
    ];
  }

  static getFromFormGroup({
    IDInfo,
    IDStudent,
    IDInfoCategory,
    Course,
    Semester,
    TextData,
    BoolData
  }: any): Info {
    return new Info(
      IDInfo,
      IDStudent,
      IDInfoCategory,
      Course,
      Semester,
      TextData,
      BoolData
    );
  }
}
