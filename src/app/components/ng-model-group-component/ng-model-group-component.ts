import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-model-group',
  imports: [CommonModule, FormsModule],
  template: `
  <h2>Template-driven forms con ngModelGroup</h2>

  <form #myForm="ngForm" (ngSubmit)="submitForm(myForm)" class="form">

    <div ngModelGroup="credentials" #groupRef="ngModelGroup">
      <label for="username">Username: <span>{{ form.credentials.username }}</span></label>
      <input [(ngModel)]="form.credentials.username" name="username" required>

      <label for="email">Email: <span>{{ form.credentials.email }}</span></label>
      <input [(ngModel)]="form.credentials.email" name="email" required email>
    </div>
    <small *ngIf="groupRef.invalid && groupRef.touched">Il gruppo non è valido</small>
    <button type="submit" [disabled]="myForm.invalid">Invia</button>
  </form>

  @if(submitted) {
    <div>
      <h3>Form submitted</h3>
      <p>Username: {{ form.credentials.username }}</p>
      <p>Email: {{ form.credentials.email }}</p>
    </div>
  }
  `,
  styles: `
    .form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `
})
export class NgModelGroupComponent {
  submitted: boolean = false;
  form: any = {
    credentials: {
      username: '',
      email: ''
    }
  };

  submitForm(form: NgForm) {
    this.submitted = true;
    const groupStatus = form.controls['credentials'].valid;
    console.log('Valid group:', groupStatus);

    this.form = form.value;
    console.log('Submitted value:', this.form);
  }
}