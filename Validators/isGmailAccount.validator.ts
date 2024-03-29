import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isGmailAccount(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex = /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/gi;
    const value = control.value;

    return !regex.test(value) ? { gmailAccount: true } : null;
  };
}
