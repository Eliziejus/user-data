import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ModalService} from "../modal/service/modal.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerUserForm: any;


  constructor( public userService: UserService, public formBuilder: FormBuilder, private modalService: ModalService) { }

  public ngOnInit(): void {

    this.registerUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rePassword: ['', Validators.required],
    }, {
      // validator: this.passwordValidator('password', 'confirm_password')
    });
  }

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
    this.closeModal('question-modal');
  }

  // public passwordValidator(password: string, rePassword: string) {
  //
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[password];
  //     const matchingControl = formGroup.controls[rePassword];
  //     if (matchingControl.errors && !matchingControl.errors['passwordValidator']) {
  //       return;
  //     }
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ passwordValidator: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   }
  // }

  public closeModal(modalId: string): void {
    this.modalService.close(modalId);
  }
}
