import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyImgDirective } from './lazy-load-img.directive';
import { InputTrimDirective } from './formControlTrim.directive';
import { CountUpDirective } from './countUp.directive';
import { InputRevertOnEmptyDirective } from './formControlRevertOnInvalid.directive';

@NgModule({
  declarations: [
    LazyImgDirective,
    InputTrimDirective,
    CountUpDirective,
    InputRevertOnEmptyDirective,
  ],
  imports: [CommonModule],
  exports: [
    LazyImgDirective,
    InputTrimDirective,
    CountUpDirective,
    InputRevertOnEmptyDirective,
  ],
  providers: [],
})
export class DirectiveModule {}
