import { ValidatorFn } from '@angular/forms';

export interface FormType {
  key: string;
  type: string;
  options?: string[] | string;
  validators?: ValidatorFn[] | ValidatorFn;
}
