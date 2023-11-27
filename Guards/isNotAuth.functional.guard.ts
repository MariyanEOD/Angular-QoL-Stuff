import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { environment } from "src/app/environments/environment"

/**
 * Usage: `{ canActivate: [isNotAuthGuard()] }`,
 * @returns CanActivateFn
 */

export function isNotAuthGuard(): CanActivateFn {
   return () => {
      const router = inject(Router)
      if (localStorage.getItem(environment.LOCAL_STORAGE_AUTH_KEY)) {
         router.navigate(["/home"])
         return false
      }
      return true
   }
}
