/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { FormGroup } from '@angular/forms';

export function passAndEmailMatchingValidatior(
  passwordControlName: string,
  matchingPasswordControlName: string,
  emailControlName: string,
  emailMatchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // The password regex cheks for the current conditions
    // Minimum eight characters, at least one letter, one number and one special character:
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

    const password = formGroup.controls[passwordControlName];
    const matchingPassword = formGroup.controls[matchingPasswordControlName];
    const passwordErrorObj = {};
    switch (true) {
      case password.value !== matchingPassword.value ||
        password.value === '' ||
        matchingPassword.value === '':
        passwordErrorObj['passwordMatchingValidator'] = true;
      case !passwordRegex.test(password.value) ||
        !passwordRegex.test(matchingPassword.value):
        passwordErrorObj['passwordRequiredInfo'] = true;
    }
    if (Object.keys(passwordErrorObj).length > 0) {
      password.setErrors(passwordErrorObj);
      matchingPassword.setErrors(passwordErrorObj);
    } else {
      password.setErrors(null);
      matchingPassword.setErrors(null);
    }

    const email = formGroup.controls[emailControlName];
    const matchingEmail = formGroup.controls[emailMatchingControlName];
    let emailErrorObj = { ...email.errors };
    if (
      email.value !== matchingEmail.value ||
      emailRegex.test(email.value) === false ||
      emailRegex.test(matchingEmail.value) === false
    ) {
      emailErrorObj['emailMatchingValidator'] = true;
      email.setErrors(emailErrorObj);
      matchingEmail.setErrors(emailErrorObj);
    } else {
      delete emailErrorObj['emailMatchingValidator'];
      if (Object.keys(emailErrorObj).length === 0) {
        emailErrorObj = null;
      }
      email.setErrors(emailErrorObj);
      matchingEmail.setErrors(emailErrorObj);
    }
  };
}
