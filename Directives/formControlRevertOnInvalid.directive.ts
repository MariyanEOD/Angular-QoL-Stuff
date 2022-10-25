import { Directive, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive({ selector: '[appInputRevertOnEmpty]' })
export class InputRevertOnEmptyDirective {
  draft;
  constructor(@Optional() private ngControl: NgControl) {
    if (!ngControl) {
      return;
    }

    this.onBlurValidate(ngControl.valueAccessor);
  }

  onBlurValidate(valueAccessor: ControlValueAccessor) {
    const original = valueAccessor.registerOnTouched;
    valueAccessor.registerOnTouched = (fn: (_: unknown) => void) =>
      original.call(valueAccessor, (_: unknown) => {
        fn(this.ngControl.value);
        let value = this.ngControl.value;

        if (typeof value === 'number') {
          value = this.ngControl.value.toString();
        }

        if (!value || !value.length) {
          this.ngControl.control.setValue(this.draft);
          return fn(this.draft);
        }
        this.draft = this.ngControl.value;
        return fn(this.ngControl.value);
      });
  }
}
