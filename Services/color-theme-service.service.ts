import { DOCUMENT } from "@angular/common"
import { Inject, Injectable } from "@angular/core"

@Injectable({
   providedIn: "root",
})
export class ColorThemeService {
   constructor(@Inject(DOCUMENT) private document: Document) {}

   setDefaultTheme() {
      const colorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)")
      const storedTheme: any = localStorage.getItem("color-theme")
      if (storedTheme) {
         return this.setTheme(storedTheme)
      }
      if (colorSchemeDark.matches) {
         this.setTheme("dark-theme")
      } else {
         this.setTheme("light-theme")
      }
   }

   setTheme(theme: "light-theme" | "dark-theme") {
      this.document.documentElement.classList.remove(
         "light-theme",
         "dark-theme",
      )
      this.document.documentElement.classList.add(theme)
      localStorage.removeItem("color-theme")
      localStorage.setItem("color-theme", theme)
   }
}
