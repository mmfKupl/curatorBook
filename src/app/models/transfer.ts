import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
import { FormType } from './form-type';
const required = Validators.required;

export class Transfer extends BaseModel {
  constructor(
    public IDTransfer: number,
    public IDStudent: number,
    public IDStudyGroup: number,
    public Date: Date
  ) {
    super();
  }

  static getTypes(): FormType[] {
    return [
      {
        key: 'IDTransfer',
        type: 'number'
      },
      {
        key: 'IDStudent',
        type: 'number',
        validators: required
      },
      {
        key: 'IDStudyGroup',
        type: 'number',
        validators: required
      },
      {
        key: 'Date',
        type: 'date',
        validators: required
      }
    ];
  }

  static getFromFormGroup({
    IDTransfer,
    IDStudent,
    IDStudyGroup,
    Date
  }: any): Transfer {
    return new Transfer(IDTransfer, IDStudent, IDStudyGroup, Date);
  }
}
