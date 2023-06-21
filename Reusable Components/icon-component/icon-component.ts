import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { BypassHTMLPipe } from '../../pipes/bypassHTML.pipe';
import { iconList as icons } from '../../icons';

@Component({
  selector: 'app-icon',
  templateUrl: 'icon.component.html',
  standalone: true,
  imports: [BypassHTMLPipe],
})
export class IconComponent implements OnInit, OnChanges {
  @ViewChild('iconContainer', { static: true }) iconContainer!: {
    nativeElement: HTMLElement;
  };
  @Input() name: string = '';
  @Input() color!: string;
  content: string = '';
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
      throw new Error('Icon component NAME input is empty.');
    }
    const foundIcon = icons[this.name as keyof typeof icons];
    if (!foundIcon) {
      throw new Error('No icon name found with: ' + this.name);
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

    const x = new XMLSerializer();
    this.renderer.setProperty(
      this.iconContainer.nativeElement,
      'innerHTML',
      x.serializeToString(parsed as Node)
    );
  }

  ngOnInit() {}
}
