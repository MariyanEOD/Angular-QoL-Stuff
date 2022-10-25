import { Directive, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive({ selector: '[appInputTrim]' })
export class InputTrimDirective {
  constructor(@Optional() private ngControl: NgControl) {
    if (!ngControl) {
      return;
    }
    trimValueAccessor(ngControl.valueAccessor);
  }
}
function trimValueAccessor(valueAccessor: ControlValueAccessor) {
  const original = valueAccessor.registerOnChange;

  valueAccessor.registerOnChange = (fn: (_: unknown) => void) =>
    original.call(valueAccessor, (value: unknown) =>
      fn(typeof value === 'string' ? value.trim() : value)
    );
}
