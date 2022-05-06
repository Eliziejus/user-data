import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ModalService} from "../modal/service/modal.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  get controls() {
    return this.registerUserForm.controls;
  }

  public registerUserForm: FormGroup;
  public emails: User[];

  constructor(public userService: UserService, public formBuilder: FormBuilder, private modalService: ModalService) {
  }

  public ngOnInit(): void {
    this.registerUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rePassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator,
    });

  }

  public passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['rePassword'].value ? null : {'mismatch': true};
  }

  public switch(): void {
    const signInAnimation = document.querySelector('#signIn');
    const signUpAnimation = document.querySelector('#signUp');
    const animationLoginButton = document.querySelector('#buttonLogin');
    const animationSignButton = document.querySelector('#buttonSign');

    animationLoginButton!.classList.add('after');
    animationSignButton!.classList.remove('after');
    signUpAnimation!.classList.add('active-switch');
    signInAnimation!.classList.add('inactive-down-switch');
    signUpAnimation!.classList.remove('inactive-switch');
    signInAnimation!.classList.remove('active-down-switch');


  }

  public create(modalId: string): void {
    this.emails = JSON.parse(localStorage.getItem('users') || '[]');
    for (let i = 0; i < this.emails.length; i++) {
      if (this.controls['email'].value === this.emails[i].email) {
        this.modalService.open('error-modal');
      } else {
        this.userService.createUser(this.registerUserForm.value);
        this.modalService.open(modalId);
      }
    }
  }

  public closeModal(modalId: string): void {
    this.modalService.close(modalId);
  }

  public onPasswordChange(): void {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({mismatch: false});
    }
  }

  public get password(): AbstractControl {
    return this.registerUserForm.controls['password'];
  }

  public get confirm_password(): AbstractControl {
    return this.registerUserForm.controls['confirm_password'];
  }
}
