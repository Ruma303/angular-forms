import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.html',
  styles: `
    .form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `
})
export class FormComponent {
  username: string = '';
  email : string = '';
  submitted: boolean = false;
  form: any = {};

  constructor() {
    console.log('FormComponent initialized');
  }

  submitForm(value: NgForm) {
    console.log('Form submitted with value:', value);
    this.submitted = true;
    this.form = value.value;
  }
}
