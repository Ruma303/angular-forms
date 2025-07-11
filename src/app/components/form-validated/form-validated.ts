import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-validated',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-validated.html',
  styles: `
    .form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .ng-valid {
      border: 2px solid green;
    }
    .ng-invalid {
      border: 2px solid red;
    }
    .ng-touched {
      background-color: #f0f0f0;
    }
    ul > li {
      color: red;
      font-size: 12px;

    }
  `
})
export class FormValidatedComponent {

  username = '';
  email = '';
  submitted = false;
  form: any = {};

  submitForm(form: NgForm) {
    console.log('Form submitted with value:', form.value);
    this.submitted = true;
    this.form = form.value; // Assign only the form values
  }

}
