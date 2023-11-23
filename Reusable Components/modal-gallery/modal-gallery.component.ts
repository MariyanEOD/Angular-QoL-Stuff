//   Usage of opening the modal
//   openSwiper(images: any[], startIndex: number) {
//   this.matDialog.open(ModalGalleryComponent, {
//     minWidth: '100vw',
//     data: {
//       images: images.map((v) => ({
//         imageUrl: v,
//         redirectUrl: null,
//       })),
//       startIndex,
//     },
//   });
// }

import { isPlatformBrowser, NgClass, NgFor, NgIf } from "@angular/common"
import {
   AfterViewInit,
   Component,
   HostListener,
   Inject,
   NgZone,
   OnInit,
   PLATFORM_ID,
   ViewChild,
} from "@angular/core"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { fadeInOnEnterAnimation } from "angular-animations"
import SwiperCore, {
   SwiperOptions,
   EffectFade,
   Autoplay,
   Navigation,
   Pagination,
   Lazy,
   Zoom,
} from "swiper"
import { SwiperComponent, SwiperModule } from "swiper/angular"

SwiperCore.use([EffectFade, Autoplay, Navigation, Pagination, Lazy, Zoom])
@Component({
   selector: "app-modal-gallery",
   templateUrl: "modal-gallery.component.html",
   standalone: true,
   imports: [NgFor, NgClass, NgIf, SwiperModule],
   animations: [fadeInOnEnterAnimation({ anchor: "fadeIn", duration: 300 })],
})
export class ModalGalleryComponent implements OnInit, AfterViewInit {
   isZoomedIn = false
   showControls!: any
   isMobile = false
   isAutoPlaying = false
   currentSlide!: number
   totalSlides!: number
   currentRedirectUrl = ""
   @ViewChild("swiper", { static: true }) swiperEl!: SwiperComponent
   @HostListener("document:mousemove", ["$event"])
   onMouseMove(e: any) {
      if (!this.showControls) {
         this.showControls = setTimeout(() => {
            clearTimeout(this.showControls)
            this.showControls = null
         }, 3000)
      }
   }
   @HostListener("window:resize", ["$event"])
   onResize(event: any) {
      if (window.innerWidth <= 500) {
         this.isMobile = true
         this.showControls = true
         return
      } else {
         this.isMobile = false
         this.showControls = null
      }
   }

   config: SwiperOptions = {
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: {
         crossFade: true,
      },

      initialSlide: this.data.startIndex,
      navigation: true,
      allowTouchMove: false,
      zoom: {
         maxRatio: 3,
         minRatio: 1,
      },
      lazy: {
         loadPrevNext: true,
         loadPrevNextAmount: 2,
      },
      speed: 1000,
   }
   constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: {
         images: { imageUrl: string; redirectUrl?: string }[]
         startIndex: number
      },
      public dialog: MatDialogRef<ModalGalleryComponent>,
      @Inject(PLATFORM_ID) private platformId: any,
      private zone: NgZone,
   ) {}
   ngAfterViewInit(): void {
      setTimeout(() => {
         this.currentSlide = this.data.startIndex + 1 || 0
         this.totalSlides = this.swiperEl.swiperRef.slides.length
      }, 1)
   }
   ngOnInit() {
      if (isPlatformBrowser(this.platformId)) {
         if (window.innerWidth <= 500) {
            this.isMobile = true
            return
         }
      }
   }
   playSwiper() {
      if (!this.isAutoPlaying) {
         this.swiperEl.swiperRef.autoplay.run()
      } else {
         this.swiperEl.swiperRef.autoplay.pause()
      }
      this.isAutoPlaying = !this.isAutoPlaying
   }
   zoomInOut() {
      this.isZoomedIn
         ? this.swiperEl.swiperRef.zoom.out()
         : this.swiperEl.swiperRef.zoom.in()
      this.isZoomedIn = !this.isZoomedIn
   }
   zoomChange(ev: any) {
      const [swiper, zoomPoint, image, slideContainer] = ev

      if (zoomPoint > 1) {
         this.showControls = true
      } else {
         this.showControls = false
      }
   }
   slideChange(ev: any) {
      if (!this.swiperEl.swiperRef) {
         setTimeout(() => this.slideChange(ev), 200)
         return
      }
      this.zone.run(() => {
         this.currentSlide = this.swiperEl.swiperRef.activeIndex + 1
         const selectedItem = this.data.images[this.currentSlide - 1]
         this.currentRedirectUrl = selectedItem?.redirectUrl || ""
         this.isZoomedIn = ev > 1 ? true : false
      })
   }
}
