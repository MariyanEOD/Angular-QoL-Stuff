import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'custom-radio-button',
  templateUrl: 'custom-radio-button.component.html',
  styleUrls: ['custom-radio-button.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class CustomRadioButtonComponent implements OnInit {
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  id = this.generateString();
  @Input() label!: string;
  @Input() checked = false;
  @Output() valueChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  generateString() {
    let result = '';
    const charactersLength = 10;
    for (let i = 0; i < charactersLength; i++) {
      result += this.characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return result;
  }
  emitValueChange(event: any) {
    this.checked = event.target.checked;
    this.valueChange.emit(this.checked);
    console.log(this.checked);
  }
}
