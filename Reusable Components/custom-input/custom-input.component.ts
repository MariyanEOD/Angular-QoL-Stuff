import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  animations: [fadeInOnEnterAnimation({ anchor: 'fadeIn', duration: 300 })],
})
export class CustomInputComponent implements OnInit, OnChanges {
  @Input() type = 'text';
  @Input() label = 'Label';
  @Input() control!: FormControl<any>;
  @Input() staticValue = '';
  @Input() disabled = false;
  @Input() showErrors = false;

  id = Math.random().toString(36).substring(2, 9);

  showPassword = false;
  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {}
}
