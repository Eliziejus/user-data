import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userLogin: any;

  constructor(public userService: UserService, public formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {

    this.userLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(5)]],
    });
  }

  public switchBack(): void {
    const signInAnimation = document.querySelector('#signIn');
    const signUpAnimation = document.querySelector('#signUp');

    signUpAnimation!.classList.add('active-switch');
    signInAnimation!.classList.add('inactive-down-switch');
    signUpAnimation!.classList.remove('inactive-switch');
    signInAnimation!.classList.remove('active-down-switch');
  }

  public login(): void {
    this.userService.login(this.userLogin.value);

  };
}
