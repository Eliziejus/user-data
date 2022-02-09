import {
  Component, ElementRef,
  EventEmitter,
  Input, NgModule,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Gender} from "../models/gender.model";
import {countries} from "../country-data-store";
import {DatePipe} from "@angular/common";
import {Profile} from "../models/profile.model";



@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
})
export class FormFieldsComponent implements OnInit {

  @Input() formValue: Profile;
  @Output() onSave: EventEmitter<Profile> = new EventEmitter<Profile>();
  public countries = countries;
  public profileForm: FormGroup;
  public now: string | null;
  private errorObject: any = { // Its the only way to solve one error
  required: {
    message: 'Field required'
  },
  minlength: {
    message: 'Text is too short'
  }
}

  genderArray = [
    new Gender('1', 'Male'),
    new Gender('2', 'Female'),
    new Gender('3', 'I dont know'),

  ];

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }
  public toString(value: any): string {
    return JSON.stringify(value)
  }
  ngOnInit(): void {
    const datePipe = new DatePipe('en-Us'); //create date
    this.now = datePipe.transform(new Date, 'yyyy-MM-dd') // transform date to default date format

    this.profileForm = this.formBuilder.group({ //create form data
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      birthday: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{9}"), Validators.minLength(3)]],
    });

    if (this.formValue) {
      this.editProfile(this.formValue);
    }
  }


  private editProfile(profile: Profile) {
    this.profileForm.patchValue({
      ...profile
    })
  }

  public save(): void { //submit form data if form is valid and sent data to data service, and
    if (this.profileForm.valid) {
      this.onSave.emit({
        ...this.profileForm.value,
        personalId: this.formValue ? this.formValue.personalId : Math.floor((Math.random() * 100) + 1)
      })

      this.profileForm.reset();
    }
  }

  public getErrorMessage(field: string) {
    const errorKeys = Object.keys(this.profileForm.controls[field].errors || {});
    return errorKeys ? (this.errorObject[errorKeys[0]]).message: '';
  }

  public dataInputClick(elementRef: HTMLElement) {
    if (this.profileForm.controls['name'].valid && this.profileForm.controls['surname'].valid){
      elementRef.focus();
    }
  }


}
