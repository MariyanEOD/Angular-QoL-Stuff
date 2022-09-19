import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

/* 
Usage
     email: [
        null,
        {
          validators: [Validators.required, isGmailAccount()],
        },
      ],
      reemail: [
        null,
        {
          validators: [Validators.required, isGmailAccount()],
        },
      ],
*/

export function isGmailAccount(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
      const regex = /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/gi
      const value = control.value

      return !regex.test(value) ? { gmailAccount: true } : null
   }
}
