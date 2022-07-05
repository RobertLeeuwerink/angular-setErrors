import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  update = false;
  newUser = {};
  form = new FormGroup({
    userName: new FormControl(''),
    userLastName: new FormControl(''),
  });
  editMode = [true];

  get userName() {
    return this.form.get('userName');
  }

  constructor() {
    this.form.valueChanges.subscribe(() => console.log(this.form));
  }

  updateUser() {
    this.newUser = {
      userName: this.form.get('userName').value,
      userLastName: this.form.get('userLastName').value,
    };
    console.log(this.newUser); //here you can make PUT to firebase
    this.update = true;
    this.addError();
  }

  reset() {
    this.form.reset();
    this.newUser = {};
  }

  addError() {
    this.form.controls['userName'].setErrors({
      incorrect: true,
      message: 'Please enter a 5 digit value',

    });
    this.form.get('userName').addAsyncValidators(ApiValidator())
    this.form.controls['userName'].markAsTouched();
    this.form.updateValueAndValidity();
  }

  toggleEditor() {
    this.editMode[0] = !this.editMode[0];
    console.log(this.form);
  }
}
