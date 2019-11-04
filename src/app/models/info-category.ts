import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
import { FormType } from './form-type';
const required = Validators.required;

export class InfoCategory extends BaseModel {
  constructor(
    public IDInfoCategory: number,
    public IDTypeInfoCategory: number,
    public Name: string
  ) {
    super();
  }

  static getTypes(): FormType[] {
    return [
      {
        key: 'IDInfoCategory',
        type: 'number'
      },
      {
        key: 'IDTypeInfoCategory',
        type: 'number',
        validators: required
      }
    ];
  }

  static getFromFormGroup({
    IDInfoCategory,
    IDTypeInfoCategory,
    Name
  }: any): InfoCategory {
    return new InfoCategory(IDInfoCategory, IDTypeInfoCategory, Name);
  }
}
