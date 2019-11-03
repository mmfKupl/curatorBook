import { FormGroup } from '@angular/forms';

export class BaseModel {
  static getFormGroup() {
    return new FormGroup({});
  }

  static getFromFormGroup(obj: any): BaseModel {
    return new BaseModel();
  }
}
