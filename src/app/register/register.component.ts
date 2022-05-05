import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ModalService} from "../modal/service/modal.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerUserForm: FormGroup;
  public emails: any;


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
  //
  // public existEmail() :void {
  //   // const email = localStorage.getItem('users');
  //   this.emails = JSON.parse(localStorage.getItem('users') || '[]');
  //   // console.log(this.emails);
  //   for (let i = 0; i < this.emails.length; i++) {
  //     if (this.controls['email'] !== this.emails[i].email) { // TODO
  //       console.log('email is taken');
  //       debugger;
  //     } else if (this.controls['email'] === this.emails[i].email) {
  //       console.log('email is not taken');
  //       debugger;
  //     }
  //     debugger;
  //   }
  // }

  public switch(): void {
    const signInAnimation = document.querySelector('#signIn');
    const signUpAnimation = document.querySelector('#signUp');

    signInAnimation!.classList.add('active-down-switch');
    signUpAnimation!.classList.add('inactive-switch');
    signInAnimation!.classList.remove('active-switch');
    signUpAnimation!.classList.remove('inactive-down-switch');
    signInAnimation!.classList.remove('inactive-down-switch');
  }

  public create(modalId: string): void {
    this.userService.createUser(this.registerUserForm.value);
    this.modalService.open(modalId);
  }

  get controls() {
    return this.registerUserForm.controls;
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

// getting the form control elements
  get password(): AbstractControl {
    return this.registerUserForm.controls['password'];
  }

  get confirm_password(): AbstractControl {
    return this.registerUserForm.controls['confirm_password'];
  }
}
