import {
   animation,
   style,
   animate,
   trigger,
   transition,
   useAnimation,
 } from '@angular/animations';
 
 // Usage
 /* 
 @Component({
    selector: "...",
    templateUrl: "...",
    styleUrls: ["..."],
    animations: [Animations.scaleAndOpacity],
 })
  */
 
 export const Animations = {
   scaleAndOpacity: trigger('alertAnimationScale', [
     transition(':enter', [
       style({ opacity: 0, transform: 'scale(0)' }),
       animate('0.4s ease-in-out', style({ opacity: 1, transform: 'scale(1)' })),
     ]),
     transition(':leave', [
       style({ opacity: 1, transform: 'scale(1)' }),
       animate('0.4s ease-in-out', style({ opacity: 0, transform: 'scale(0)' })),
     ]),
   ]),
   translateAndOpacity: trigger('alertAnimationTranslate', [
     transition(':enter', [
       style({ opacity: 0, transform: 'translateY(-15px)' }),
       animate(
         '0.4s ease-in-out',
         style({ opacity: 1, transform: 'translateY(0)' })
       ),
     ]),
     transition(':leave', [
       style({ opacity: 1, transform: 'translateY(0)' }),
       animate(
         '0.4s ease-in-out',
         style({ opacity: 0, transform: 'translateY(-15px)' })
       ),
     ]),
   ]),
 };
 