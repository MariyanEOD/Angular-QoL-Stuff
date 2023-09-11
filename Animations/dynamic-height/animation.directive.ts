import {
   Directive,
   ElementRef,
   HostBinding,
   Input,
   SimpleChanges,
} from "@angular/core"

@Directive({
   selector: "[appSmoothHeight]",
   standalone: true,
})
export class SmoothHeightDirective {
   @Input() appSmoothHeight!: boolean
   pulse!: boolean
   startHeight!: number

   constructor(private element: ElementRef) {}

   @HostBinding("@grow")
   get grow() {
      return { value: this.pulse, params: { startHeight: this.startHeight } }
   }

   setStartHeight() {
      this.startHeight = this.element.nativeElement.clientHeight
   }

   ngOnChanges(changes: SimpleChanges) {
      this.setStartHeight()
      this.pulse = !this.pulse
   }
}
