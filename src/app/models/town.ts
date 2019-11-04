import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
const required = Validators.required;

export class Town extends BaseModel {
  constructor(public IDTown: number, public Name: string) {
    super();
  }

  static getFormGroup() {
    return new FormGroup({
      IDTown: new FormControl(),
      Name: new FormControl('', required)
    });
  }

  static getFromFormGroup({ IDTown, Name }: any): Town {
    return new Town(IDTown, Name);
  }
}
