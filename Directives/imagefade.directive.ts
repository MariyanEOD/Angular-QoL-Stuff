import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appImageFade]',
  standalone: true,
})
export class ImageFadeDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'all 0.3s ease-in-out',
    );
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(0.95)');
  }

  @HostListener('load', ['$event'])
  onLoad() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}
