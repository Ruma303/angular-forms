import { Component, signal } from '@angular/core';
import { FormComponent } from './components/form/form';
import { FormModelComponent } from './components/form-model-component/form-model-component';

@Component({
  selector: 'app-root',
  imports: [FormComponent, FormModelComponent],
  template: `
  <h1>{{ title }}</h1>
  <h3>{{ welcomeMessage() }}</h3>
  <app-form (formExported)="handleForm($event)"></app-form>
  <form-model></form-model>
  `,
  styles: ``
})
export class App {
  title: string = 'angular-forms';
  welcomeMessage = signal<string>('Welcome to Angular Forms!');

  handleForm(form: { username: string; email: string; age: number }) {
    console.log('Form submitted:', form);
    this.welcomeMessage.set(`Welcome, ${form.username}!`);
  }
}
