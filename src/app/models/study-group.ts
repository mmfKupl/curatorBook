import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
const required = Validators.required;

export class StudyGroup extends BaseModel {
  constructor(
    public IDStudyGroup: number,
    public IDEmployee: number,
    public GroupNumber: string,
    public Specialty: string,
    public DateOfFormation: Date
  ) {
    super();
  }

  static getFormGroup() {
    return new FormGroup({
      IDStudyGroup: new FormControl(),
      IDEmployee: new FormControl(0, required),
      GroupNumber: new FormControl('', required),
      Specialty: new FormControl('', required),
      DateOfFormation: new FormControl(new Date(), required)
    });
  }

  static getFromFormGroup({
    IDStudyGroup,
    IDEmployee,
    GroupNumber,
    Specialty,
    DateOfFormation
  }: any): StudyGroup {
    return new StudyGroup(
      IDStudyGroup,
      IDEmployee,
      GroupNumber,
      Specialty,
      DateOfFormation
    );
  }
}
