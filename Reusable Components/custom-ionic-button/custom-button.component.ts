import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'custom-button',
  templateUrl: 'custom-button.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CustomButtonComponent implements OnInit, OnChanges {
  @Input() type = 'button';
  @Input() label = '';
  @Input() disabled = false;
  @Input() loading = false;
  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {}
}
