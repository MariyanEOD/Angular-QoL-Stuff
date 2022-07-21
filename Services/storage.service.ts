/* 
  Made to work with Angular-Universal for SSR
  Added appropriate checks
  Added appropriate Injectables
  Uses Local Storage for TokenStorage
  Combined with auth.interceptor to append the token to the header of request
*/

import { DOCUMENT, isPlatformBrowser } from "@angular/common"
import { Inject, Injectable, PLATFORM_ID } from "@angular/core"
/* import { Store } from '@ngrx/store';
import { Logout } from '../actions/user.actions'; */

const TOKEN_KEY = "auth-token"
const USER_KEY = "auth-user"

@Injectable({
   providedIn: "root",
})
export class StorageService {
   private window: Window
   constructor(
      /*   private store: Store, */
      @Inject(DOCUMENT) private document: Document,
      @Inject(PLATFORM_ID) private _platformId: Object,
   ) {
      this.window = this.document.defaultView
   }

   signOut(): void {
      if (isPlatformBrowser(this._platformId)) {
         this.window.localStorage.clear()
         /*  
     Used with NgRXN Store
     this.store.dispatch(Logout()); 
     */
      }
   }

   public saveToken(token: string): void {
      if (isPlatformBrowser(this._platformId)) {
         this.window.localStorage.removeItem(TOKEN_KEY)
         this.window.localStorage.setItem(TOKEN_KEY, token)
      }
   }

   public save(key, data: any): void {
      if (isPlatformBrowser(this._platformId)) {
         this.window.localStorage.removeItem(key)
         this.window.localStorage.setItem(key, data)
      }
   }
   public get(key): any {
      const data = this.window.localStorage.getItem(key)
      if (data) {
         return JSON.parse(data)
      }

      return {}
   }
   public remove(item): any {
      if (isPlatformBrowser(this._platformId)) {
         this.window.localStorage.removeItem(item)
      }
   }

   public getToken(): string | null {
      if (isPlatformBrowser(this._platformId)) {
         return this.window.localStorage.getItem(TOKEN_KEY)
      }
   }

   public saveUser(user: any): void {
      this.window.localStorage.removeItem(USER_KEY)
      this.window.localStorage.setItem(USER_KEY, JSON.stringify(user))
   }

   public getUser(): any {
      const user = this.window.localStorage.getItem(USER_KEY)
      if (user) {
         return JSON.parse(user)
      }

      return {}
   }
}
