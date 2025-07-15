import { Component, model, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface User {
  username: string;
  email: string;
  age: number;
  address: {
    city: string;
    zip: string;
  };
}

@Component({
  selector: 'form-model',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2>ModelSignal form</h2>
    <form class="form">
      <label>Username</label>
      <input [(ngModel)]="user().username" name="username">
      <label>Email</label>
      <input [(ngModel)]="user().email" name="email">
      <label>Age</label>
      <input [(ngModel)]="user().age" name="age" type="number">
      <label>City</label>
      <input [(ngModel)]="user().address.city" name="city">
      <label>ZIP</label>
      <input [(ngModel)]="user().address.zip" name="zip">
      <button (click)="submit()">Submit</button>
    </form>

    <div *ngIf="isAdult()">
      <h3>User Info</h3>
      <p>Username: {{ user().username }}</p>
      <p>Email: {{ userEmail() }}</p>
      <p>City: {{ user().address.city }}</p>
      <p>ZIP: {{ user().address.zip }}</p>
    </div>
  `,
  styles: [`.form { display: flex; flex-direction: column; gap: 10px; width: 300px; }`]
})
export class FormModelComponent {
  user = model<User>({
    username: '',
    email: '',
    age: 0,
    address: { city: '', zip: '' }
  });

  readonly isAdult = computed(() => this.user().age >= 18);
  readonly userEmail = computed(() => this.user().email.toLowerCase());

  submit() {
    // 1. `.set()` per sostituire completamente l'oggetto
    this.user.set({
      ...this.user(),
      username: this.user().username + '_set'
    });

    // 2. `.update()` per aggiornamento immutabile
    this.user.update(current => ({
      ...current,
      age: current.age + 1
    }));

    console.log('ModelSignal finale:', this.user());
  }
}
