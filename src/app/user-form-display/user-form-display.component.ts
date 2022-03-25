import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {FormField} from "../enums/form-field.enums";

@Component({
  selector: 'app-user-form-display',
  templateUrl: './user-form-display.component.html',
  styleUrls: ['./user-form-display.component.scss']
})
export class UserFormDisplayComponent implements OnInit {

  constructor( private element: ElementRef, public userService: UserService, public formBuilder: FormBuilder) { }
  public userLogin: any;
  public registerUserForm: any;
  ngOnInit(): void {

    this.userLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerUserForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
    });
  }

  public switch(): void {
    const signInAnimation = this.element.nativeElement.querySelector('#signIn');
    const signUpAnimation = this.element.nativeElement.querySelector('#signUp');

    signInAnimation.classList.add('active-down-switch');
    signUpAnimation.classList.add('inactive-switch');
    signInAnimation.classList.remove('active-switch');
    signUpAnimation.classList.remove('inactive-down-switch');
    signInAnimation.classList.remove('inactive-down-switch');
  }

  public switchBack(formSwitch: string): void {
    if (formSwitch) {

    }
    const signInAnimation = this.element.nativeElement.querySelector('#signIn');
    const signUpAnimation = this.element.nativeElement.querySelector('#signUp');

    signUpAnimation.classList.add('active-switch');
    signInAnimation.classList.add('inactive-down-switch');
    signUpAnimation.classList.remove('inactive-switch');
    signInAnimation.classList.remove('active-down-switch');
  }

  public login(): void {
    this.userService.login(this.userLogin.value);
  }

  public create(): void {
    this.userService.createUser(this.registerUserForm.value);
    debugger;
  }

}
// pasidaryti atskirta validacija password patikrinimui
