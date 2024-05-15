import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>(); // Event emitted on outside click

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(targetElement: HTMLElement) {
    const parent = this.elementRef.nativeElement;
    const clickedInside = parent.contains(targetElement);

    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
