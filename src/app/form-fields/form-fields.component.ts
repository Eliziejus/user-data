import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Gender} from "../models/gender.model";
import {DatePipe} from "@angular/common";
import {Profile} from "../models/profile.model";
import {FormField} from "../enums/form-field.enums";

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
})
export class FormFieldsComponent implements OnInit {

  @Input() formValue: Profile;
  @Output() onSave: EventEmitter<Profile> = new EventEmitter<Profile>();

  public profileForm: FormGroup;
  public now: string | null;
  public field = FormField
  private errorObject: { [key: string]: { message: string } } = {
    required: {
      message: 'Field required'
    },
    minlength: {
      message: 'Text is too short'
    },
  }

  public genderArray: Gender[] = [
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

  public ngOnInit(): void {
    const datePipe = new DatePipe('en-Us'); //create date
    this.now = datePipe.transform(new Date, 'yyyy-MM-dd') // transform date to default date format

    this.profileForm = this.formBuilder.group({ //create form data
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('([A-Z][a-zA-Z]*)')]],
      surname: ['', [Validators.required,
        Validators.minLength(3), Validators.pattern('([A-Z][a-zA-Z]*)')]],
      birthday: ['', [Validators.required]],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^86[0-9]{7}')]], //TODO Regex +370 or 86
    });

    if (this.formValue) {
      this.editProfile(this.formValue);
    }
  }


  private editProfile(profile: Profile): void {
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
    const errorKeys = Object.keys(this.profileForm.controls[field].errors || [{}]);
    return errorKeys ? (this.errorObject[errorKeys[0]])?.message : '';
  }

  public dataInputClick(elementRef: HTMLElement): void {
    if (this.profileForm.controls[FormField.Name].valid && this.profileForm.controls[FormField.Surname].valid) {
      elementRef.focus();
    }
  }

  //TODO update not working
   //TODO app is not working when localstorage is disabled
  //TODO table still missing paddings
  //TODO DO NOT IGNORE COMMENTS
  //TODO isanalizuoti koda
  //TODO All actions with data should be in service (only these actions which are like http calls)
  //TODO DO NOT USE CODE IF U DONT UNDERSTAND IT phase `if it works dont touch` not working in this case
}
