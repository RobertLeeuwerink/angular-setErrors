import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newUser = {};
  form = new FormGroup({
    userName: new FormControl(''),
    userLastName: new FormControl(''),
  });
  editMode = new BehaviorSubject<boolean>(true);

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
    this.form.updateValueAndValidity();
  }

  toggleEditor() {
    this.editMode.next(!this.editMode.getValue());
    console.log(this.form);
  }
}
