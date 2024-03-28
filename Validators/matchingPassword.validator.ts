import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"
/**
 * @function matchingPasswords
 * @description Validates that two password controls within a reactive form group match.
 * @description Usage: `
 * form.group(
 * {...},
 * { validators: [matchingPassword('KEY_1', 'KEY_2')] }
 * )`
 * @param {string} passwordControlKey The name (key) of the form control containing the initial password value.
 * @param {string} repeatPasswordControlKey The name (key) of the form control where the user re-enters the password for confirmation.
 * @returns {ValidatorFn} A function that implements the `ValidatorFn` interface for form validation. The error object is `{mustMatch: true}`
 **/
export function matchingPasswords(
   passwordControlKey: string,
   repeatPasswordControlKey: string,
): ValidatorFn {
   return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(passwordControlKey)
      const repeatPasswordControl = formGroup.get(repeatPasswordControlKey)
      if (passwordControl?.value !== repeatPasswordControl?.value) {
         return { mustMatch: true }
      }

      return null
   }
}
