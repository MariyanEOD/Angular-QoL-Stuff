import { NgIf, NgOptimizedImage } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { fromEvent, take } from 'rxjs';
import { CustomSkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'custom-image',
  templateUrl: 'image-wth-loader.component.html',
  standalone: true,
  imports: [NgIf, NgOptimizedImage, CustomSkeletonLoaderComponent],
  animations: [fadeOutOnLeaveAnimation({ anchor: 'fadeOut', duration: 500 })],
})
export class CustomImageWthLoaderComponent implements OnInit {
  @ViewChild('imgEl', { static: true }) imageRef!: ElementRef;
  @Input() src!: string;
  isloaded = false;
  constructor() {}

  ngOnInit() {
    fromEvent(this.imageRef.nativeElement, 'load')
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isloaded = true;
        },
      });
  }
}
