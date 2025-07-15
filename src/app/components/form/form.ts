import { Component, signal, computed, effect, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WritableSignal, Signal } from '@angular/core';

interface form {
  username: string;
  email: string;
  age: number;
}
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2>Primitive signals forms</h2>

    <form #myForm="ngForm" (ngSubmit)="submitForm(myForm)" class="form">
      <label for="username">
        Username: <span>{{ username() }}</span>
      </label>
      <input [(ngModel)]="usernameModel" name="username">

      <label for="email">
        Email: <span>{{ email() }}</span>
      </label>
      <input [(ngModel)]="emailModel" name="email">

      <label for="age">
        Age: <span>{{ age() }}</span>
      </label>
      <input [(ngModel)]="ageModel" name="age" type="number">

      <button type="submit" [disabled]="myForm.invalid">Invia</button>
    </form>

    @if(submitted()) {
      <div>
        <h3>Form submitted</h3>
        <p>Username: {{ form()?.username }}</p>
        <p>Email: {{ form()?.email }}</p>
        <p *ngIf="isAdult()">Age: {{ form()?.age }}</p>
      </div>
    }

    @if(visibleError()) {
      <div>
        <h3>{{ visibleError() }}</h3>
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
export class FormComponent {
  usernameModel: string = '';
  emailModel: string = '';
  ageModel: number = 0;

  username: WritableSignal<string> = signal('');
  email: WritableSignal<string> = signal('');
  age: WritableSignal<number> = signal(0);
  errorMessage = signal<string>('');

  submitted: WritableSignal<boolean> = signal(false);
  isAdult: Signal<boolean> = computed(() => this.age() !== null && this.age()! >= 18);

  readonly visibleError = computed(() => !this.submitted() && this.errorMessage());

  form: WritableSignal<form | null> = signal(null);

  formExported = output<form>();

  constructor() {
    effect(() => {
      this.username.set(this.usernameModel);
      this.email.set(this.emailModel);
    });
  }

  submitForm(form: NgForm) {
    // sincronizza i dati del modello prima di validare
    this.username.set(this.usernameModel);
    this.email.set(this.emailModel);
    this.age.set(this.ageModel);

    if (!this.isAdult()) {
      this.submitted.set(false);
      return this.errorMessage.set('You must be at least 18 years old to submit the form.');
    }

    if (form.valid) {
      const payload = {
        username: this.username(),
        email: this.email(),
        age: this.age()
      };
      this.form.set(payload);
      this.submitted.set(true);
      this.errorMessage.set('');
      this.formExported.emit(payload);
    } else {
      this.submitted.set(false);
      this.errorMessage.set('Please fill out all fields correctly.');
    }
  }
}