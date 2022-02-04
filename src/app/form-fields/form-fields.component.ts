import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {Gender} from "../models/gender.model";
import {countries} from "../country-data-store";
import {DatePipe} from "@angular/common";
import {Profile} from "../models/profile.model";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldsComponent implements OnInit {

  @Input() formValue: Profile;
  @Output() onSave: EventEmitter<Profile> = new EventEmitter<Profile>();
  public countries = countries;
  public profileForm: FormGroup;
  public now: string | null;


  genderArray = [
    new Gender('1', 'Male'),
    new Gender('2', 'Female'),
    new Gender('3', 'I dont know'),

  ];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
  ) {
  }

  ngOnInit(): void {
    const datePipe = new DatePipe('en-Us'); //create date
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd') // transform date to default date format

    this.profileForm = this.formBuilder.group({ //create form data
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required,],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });

    if (this.formValue) {
      this.editProfile(this.formValue);
    }

  }


  editProfile(profile: Profile) {
    this.profileForm.patchValue({
      name: profile.name,
      surname: profile.surname,
      birthday: profile.birthday,
      gender: profile.gender,
      phoneNumber: profile.phoneNumber,
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
}
