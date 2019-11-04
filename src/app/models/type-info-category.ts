import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
import { FormType } from './form-type';
const required = Validators.required;

export class TypeInfoCategory extends BaseModel {
  constructor(public IDTypeInfoCategory: number, public Name: string) {
    super();
  }

  static getTypes(): FormType[] {
    return [
      {
        key: 'IDTypeInfoCategory',
        type: 'number'
      },
      {
        key: 'Name',
        type: 'text',
        validators: required
      }
    ];
  }

  static getFromFormGroup({ IDTypeInfoCategory, Name }: any): TypeInfoCategory {
    return new TypeInfoCategory(IDTypeInfoCategory, Name);
  }
}
