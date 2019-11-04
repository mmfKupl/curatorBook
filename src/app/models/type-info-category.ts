import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
const required = Validators.required;

export class TypeInfoCategory extends BaseModel {
  constructor(public IDTypeInfoCategory: number, public Name: string) {
    super();
  }

  static getFormGroup() {
    return new FormGroup({
      IDTypeInfoCategory: new FormControl(),
      Name: new FormControl('', required)
    });
  }

  static getFromFormGroup({ IDTypeInfoCategory, Name }: any): TypeInfoCategory {
    return new TypeInfoCategory(IDTypeInfoCategory, Name);
  }
}
