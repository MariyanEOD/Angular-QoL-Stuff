import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchingPasswords(
  passwordControlKey: string,
  repeatPasswordControlKey: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(passwordControlKey);
    const repeatPasswordControl = formGroup.get(repeatPasswordControlKey);
    if (passwordControl?.value !== repeatPasswordControl?.value) {
      return { mustMatch: true };
    }

    return null;
  };
}
