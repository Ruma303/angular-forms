import { Component } from '@angular/core';
import { FormComponent } from './components/form/form';
import { FormValidatedComponent } from './components/form-validated/form-validated';

@Component({
  selector: 'app-root',
  imports: [FormComponent, FormValidatedComponent],
  templateUrl: './app.html',
  styles: ``
})
export class App {
  protected title = 'angular-forms';
}
