import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseModel } from './base-model';
const required = Validators.required;

export class Info extends BaseModel {
  constructor(
    public IDInfo: number,
    public IDStudent: number,
    public IDInfoCategory: number,
    public Course: number,
    public Semester: number,
    public TextData: string,
    public BoolData: boolean
  ) {
    super();
  }

  static getFormGroup() {
    return new FormGroup({
      IDInfo: new FormControl(0, required),
      IDStudent: new FormControl(0, required),
      IDInfoCategory: new FormControl(0, required),
      Course: new FormControl(0, required),
      Semester: new FormControl(0, required),
      TextData: new FormControl('', required),
      BoolData: new FormControl(false, required)
    });
  }

  static getFromFormGroup({
    IDInfo,
    IDStudent,
    IDInfoCategory,
    Course,
    Semester,
    TextData,
    BoolData
  }: any): Info {
    return new Info(
      IDInfo,
      IDStudent,
      IDInfoCategory,
      Course,
      Semester,
      TextData,
      BoolData
    );
  }
}
