import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
import { FormType } from './form-type';
const required = Validators.required;

export class Town extends BaseModel {
  constructor(public IDTown: number, public Name: string) {
    super();
  }

  static getTypes(): FormType[] {
    return [
      {
        key: 'IDTown',
        type: 'number'
      },
      {
        key: 'Name',
        type: 'text',
        validators: required
      }
    ];
  }

  static getFromFormGroup({ IDTown, Name }: any): Town {
    return new Town(IDTown, Name);
  }
}
