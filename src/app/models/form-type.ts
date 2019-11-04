import { ValidatorFn } from '@angular/forms';

export interface FormType {
  key: string;
  type: string;
  options?: string[];
  validators?: ValidatorFn[] | ValidatorFn;
}
