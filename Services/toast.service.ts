import { Injectable } from "@angular/core"
import { ToastController, ToastOptions } from "@ionic/angular"

@Injectable({ providedIn: "root" })
export class ToastService {
   DURATION = 2000
   constructor(private toastController: ToastController) {}
   async toast(message: string, duration?: number) {
      const body: ToastOptions = {
         position: "top",
         keyboardClose: true,
         duration: this.DURATION,
         buttons: [
            {
               role: "cancel",
               icon: "close-outline",
            },
         ],
         cssClass: "toast-regular",
      }
      if (duration) {
         body.duration = duration
      }
      body.message = message
      const toast = await this.toastController.create(body)
      await toast.present()
   }
   async toastSuccess(message: string, duration?: number) {
      const body: ToastOptions = {
         keyboardClose: true,
         position: "top",
         duration: this.DURATION,
         buttons: [
            {
               role: "cancel",
               icon: "close-outline",
            },
         ],
         cssClass: "toast-success",
         icon: "checkmark-circle-outline",
      }
      if (duration) {
         body.duration = duration
      }
      body.message = message
      const toast = await this.toastController.create(body)
      await toast.present()
   }
   async toastError(message: string, duration?: number) {
      const body: ToastOptions = {
         position: "top",
         keyboardClose: true,
         buttons: [
            {
               role: "cancel",
               icon: "close-outline",
            },
         ],
         duration: this.DURATION,
         cssClass: "toast-error",
         icon: "alert-circle-outline",
      }
      if (duration) {
         body.duration = duration
      }
      body.message = message
      const toast = await this.toastController.create(body)
      await toast.present()
   }
}
