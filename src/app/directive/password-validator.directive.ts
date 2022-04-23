import {AbstractControl, FormGroup, NG_VALIDATORS, Validators} from "@angular/forms";
import {Directive, Input} from "@angular/core";


export function PasswordValidator(password: string, rePassword: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[password];
    const matchingControl = formGroup.controls[rePassword];
    if (matchingControl.errors && !matchingControl.errors["passwordValidator"]) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
