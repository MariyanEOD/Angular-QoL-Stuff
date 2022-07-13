import {
   animation,
   style,
   animate,
   trigger,
   transition,
   useAnimation,
} from "@angular/animations"

// Usage
@Component({
   selector: "...",
   templateUrl: "...",
   styleUrls: ["..."],
   animations: [Animations.scaleAndOpacity],
})
export const Animations = {
   scaleAndOpacity: trigger("alertAnimation", [
      transition(":enter", [
         style({ opacity: 0, transform: "scale(0)" }),
         animate(
            "0.2s ease-in-out",
            style({ opacity: 1, transform: "scale(1)" }),
         ),
      ]),
      transition(":leave", [
         style({ opacity: 1, transform: "scale(1)" }),
         animate(
            "0.2s ease-in-out",
            style({ opacity: 0, transform: "scale(0)" }),
         ),
      ]),
   ]),
}
