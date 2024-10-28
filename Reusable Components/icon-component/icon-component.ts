import {
   Component,
   Input,
   OnChanges,
   OnInit,
   Renderer2,
   SimpleChanges,
   ViewChild,
 } from '@angular/core';
 import { IconKey, iconList as icons } from '../../shared/icons';
 
 
 
 interface IconPartColoring {
   element: string;
   fill?: string;
   stroke?: string;
 }
 @Component({
   selector: 'app-icon',
   templateUrl: 'icon.component.html',
   standalone: true,
 })
 export class IconComponent implements OnChanges {
   @ViewChild('iconContainer', { static: true }) iconContainer!: {
     nativeElement: HTMLElement;
   };
   @Input() width!: string;
   @Input() height!: string;
   @Input({ required: true }) name!: IconKey;
   @Input() color!: string;
   @Input() parts!: IconPartColoring[];
   constructor(private renderer: Renderer2) {}
   ngOnChanges(changes: SimpleChanges): void {
     const { name } = changes;
     if (name) {
       this.name = name.currentValue;
       this.setIcon();
     }
   }
   setIcon() {
     if (!this.name) {
       console.warn('Icon component NAME input is empty.');
       return;
     }
     const foundIcon = icons[this.name as keyof typeof icons];
     if (!foundIcon) {
       console.warn('No icon name found with: ' + this.name);
       return;
     }
     const parser = new DOMParser();
     const parsed = parser
       .parseFromString(foundIcon, 'image/svg+xml')
       .querySelector('svg');
     if (this.color) {
       parsed?.querySelectorAll('path').forEach((v) => {
         v.style.stroke = this.color;
       });
     }
     if (this.width) {
       parsed?.setAttribute('width', this.width);
     }
     if (this.height) {
       parsed?.setAttribute('height', this.height);
     }
     if (this.parts) {
       this.parts.forEach((p) => {
         parsed?.querySelectorAll(p.element).forEach((el: any) => {
           if (p.fill) {
             el.style.fill = p.fill;
           }
           if (p.stroke) {
             el.style.stroke = p.stroke;
           }
         });
       });
     }
     const x = new XMLSerializer();
     this.renderer.setProperty(
       this.iconContainer.nativeElement,
       'innerHTML',
       x.serializeToString(parsed as Node)
     );
   }
 }
 