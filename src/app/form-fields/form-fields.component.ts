import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {Gender} from "../models/gender.model";
import {countries} from "../country-data-store";
import {DatePipe} from "@angular/common";
import {Profile} from "../models/profile.model";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldsComponent implements OnInit {

  public countries = countries;
  public profileForm: FormGroup;
  public data: Profile[];
  public now: string | null;


  genderArray = [
    new Gender('1', 'Male'),
    new Gender('2', 'Female'),
    new Gender('3', 'I dont know'),

  ];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({ //create form data
      name: ['', Validators.required, Validators.max(10)],
      surname: ['', Validators.required, Validators.max(10)],
      birthday: ['', Validators.required,],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      personalId: [this.getPersonalId()],
    });

    const datePipe = new DatePipe('en-Us'); //create date
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd') // transform date to default date format
    this.dataService.profileData.subscribe((item) => { //subscibe data that data show in table component and see all changes
      this.data = item;
    });
    this.data = this.dataService.getData(); // see all changes in localstorage

    // this.route.paramMap.subscribe(params => {
    //   const profileId = params.get('id') as null;
    //   if(profileId) {
    //     this.getProfileData(profileId);
    //   }
    // });
  }

  // getProfileData(id: number) {
  //   this.dataService.getProfile(id).subscribe(
  //     (profile: Profile) => this.editProfile(profile),
  //   );
  // }

  editProfile(profile: Profile){
    this.profileForm.patchValue({
      name: profile.name,
      surname: profile.surname,
      birthday: profile.birthday,
      gender: profile.gender,
      phoneNumber: profile.phoneNumber,
      personalId: profile.personalId
    })
  }

  public getPersonalId() { // get personal id to each person
    return Math.floor((Math.random() * 100) + 1);
  };

  public addData():void { //submit form data if form is valid and sent data to data service
    if (this.profileForm.valid){
      this.dataService.setData(this.profileForm.value);
      this.profileForm.reset();
    }

  }

}
