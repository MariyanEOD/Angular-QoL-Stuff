import {
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function passwordStrength(passwordControlKey: string): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const passwordControl = formGroup.get(passwordControlKey);
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (!passwordRegex.test(passwordControl.value)) {
      return { weakPassword: true };
    }

    return {};
  };
}
