import { Component } from '@angular/core';
import { FormComponent } from './components/form/form';
import { FormValidatedComponent } from './components/form-validated/form-validated';
import { NgModelGroupComponent } from './components/ng-model-group-component/ng-model-group-component';

@Component({
  selector: 'app-root',
  imports: [FormComponent, FormValidatedComponent, NgModelGroupComponent],
  templateUrl: './app.html',
  styles: ``
})
export class App {
  protected title = 'angular-forms';
}
