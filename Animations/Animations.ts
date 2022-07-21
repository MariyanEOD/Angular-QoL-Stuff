import {
   animation,
   style,
   animate,
   trigger,
   transition,
   useAnimation,
   query,
   stagger,
} from "@angular/animations"

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
   scaleAndOpacity: trigger("alertAnimationScale", [
      transition(":enter", [
         style({ opacity: 0, transform: "scale(0)" }),
         animate(
            "0.4s ease-in-out",
            style({ opacity: 1, transform: "scale(1)" }),
         ),
      ]),
      transition(":leave", [
         style({ opacity: 1, transform: "scale(1)" }),
         animate(
            "0.4s ease-in-out",
            style({ opacity: 0, transform: "scale(0)" }),
         ),
      ]),
   ]),
   translateAndOpacity: trigger("alertAnimationTranslate", [
      transition(":enter", [
         style({ opacity: 0, transform: "translateY(-15px)" }),
         animate(
            "0.4s ease-in-out",
            style({ opacity: 1, transform: "translateY(0)" }),
         ),
      ]),
      transition(":leave", [
         style({ opacity: 1, transform: "translateY(0)" }),
         animate(
            "0.4s ease-in-out",
            style({ opacity: 0, transform: "translateY(-15px)" }),
         ),
      ]),
   ]),
}

export const fader = trigger("routeAnimations", [
   transition("* <=> *", [
      query(":enter, :leave", [
         style({
            position: "absolute",
            left: 0,
            width: "100%",
            opacity: 0,
            transform: "scale(0) translateY(100%)",
         }),
      ]),
      query(":enter", [
         animate(
            "600ms ease",
            style({ opacity: 1, transform: "scale(1) translateY(0)" }),
         ),
      ]),
   ]),
])

export const loaderOverlayFade = trigger("fade", [
   transition("* => *", [
      // each time the binding value changes
      query(":enter", [animate("2000ms ease-in-out", style({ opacity: 1 }))], {
         optional: true,
      }),
      query(":leave", [animate("2000ms ease-in-out", style({ opacity: 0 }))], {
         optional: true,
      }),
   ]),
])

export const isOutAnimation = trigger("inOutAnimation", [
   transition(":enter", [
      style({ opacity: 0 }),
      animate("150ms ease-in-out", style({ opacity: 1 })),
   ]),
   transition(":leave", [
      style({ opacity: 1 }),
      animate("150ms ease-in-out", style({ opacity: 0 })),
   ]),
])

export const isInAnimation = trigger("isInAnimation", [
   transition("* => *", [
      // each time the binding value changes
      query(
         ":enter",
         [
            style({ opacity: 0 }),
            stagger(200, [animate("0.2s", style({ opacity: 1 }))]),
         ],
         { optional: true },
      ),
   ]),
])
