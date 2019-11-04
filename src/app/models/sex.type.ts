import { ValidatorFn, AbstractControl } from '@angular/forms';

export type SexType = 'М' | 'Ж';

export const SexTypeRegExp = /^М$|^Ж$/g;

export function forbiddenNameValidator(
  nameRe: RegExp,
  revert: boolean
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    console.log(control.value);
    const forbidden = nameRe.test(control.value);
    console.log(forbidden);
    if (revert) {
      return forbidden ? null : { forbiddenName: { value: control.value } };
    }
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
