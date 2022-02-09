import {
  Component, ElementRef, //not used
  EventEmitter,
  Input, NgModule, //not used
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms"; //not used
import {Gender} from "../models/gender.model";
import {countries} from "../country-data-store"; // not used
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
  private errorObject: { [key: string]: { message: string } } = { // Its the only way to solve one error
    required: {
      message: 'Field required'
    },
    minlength: {
      message: 'Text is too short'
    }
  }

  // ?????
  genderArray = [ // todo type ?
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
      phoneNumber: ['', [Validators.required]], //TODO Regex +370 or 86
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
        personalId: this.formValue?.personalId || Math.floor((Math.random() * 100) + 1)
      })

      this.profileForm.reset();
    }
  }

  public getErrorMessage(field: string) {
    const errorKeys = Object.keys(this.profileForm.controls[field].errors || {});
    return errorKeys ? (this.errorObject[errorKeys[0]]).message : '';
  }

  public dataInputClick(elementRef: HTMLElement) {
    if (this.profileForm.controls['name'].valid && this.profileForm.controls['surname'].valid) {
      elementRef.focus();
    }
  }

//TODO move form fields to enums instead of strings ;x
  //TODO fix input name and surname validation name can not be empty like three spaces or special characters
  //TODO all functions MUST have return types
  //TODO all functions MUST have types
  //TODO update not working
  //TODO after update should redirect back to list page
  //TODO after cancel delete all still data dissapear
  //TODO app is not working when localstorage is disabled
  //TODO table still missing paddings
  //TODO DO NOT IGNORE COMMENTS
  //TODO isanalizuoti koda
  //TODO remove unused code
  //TODO All actions with data should be in service (only these actions which are like http calls)
  //TODO DO NOT USE CODE IF U DONT UNDERSTAND IT phase `if it works dont touch` not working in this case
}
