import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
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

  static getFormGroup() {
    return new FormGroup({
      IDTransfer: new FormControl(0, required),
      IDStudent: new FormControl(0, required),
      IDStudyGroup: new FormControl(0, required),
      Date: new FormControl(new Date(), required)
    });
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
