import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
const required = Validators.required;

export class InfoCategory extends BaseModel {
  constructor(
    public IDInfoCategory: number,
    public IDTypeInfoCategory: number,
    public Name: string
  ) {
    super();
  }

  static getFormGroup() {
    return new FormGroup({
      IDInfoCategory: new FormControl(0, required),
      IDTypeInfoCategory: new FormControl(0, required),
      Name: new FormControl('', required)
    });
  }

  static getFromFormGroup({
    IDInfoCategory,
    IDTypeInfoCategory,
    Name
  }: any): InfoCategory {
    return new InfoCategory(IDInfoCategory, IDTypeInfoCategory, Name);
  }
}
