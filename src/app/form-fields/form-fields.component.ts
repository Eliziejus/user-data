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
  changeDetection: ChangeDetectionStrategy.Default,
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
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required,],
      gender: ['', Validators.required],
      phoneNumber: ['86', [Validators.required,
        Validators.minLength(11), Validators.maxLength(11)]],
      personalId: [this.getPersonalId()],
    });

    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.dataService.profileData.subscribe((item) => {
      this.data = item;
      this.cdr.markForCheck();
    });

    this.route.paramMap.subscribe(params => {
      const profileId = params.get('id') as null;
      if(profileId) {
        this.getProfileData(profileId);
      }
    });
  }

  getProfileData(id: number) {
    this.dataService.getProfile(id).subscribe(
      (profile: Profile) => this.editProfile(profile),
    );
  }

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

  public getPersonalId() {
    return Math.floor((Math.random() * 100) + 1);
  };

  public addData():void {
    if (this.profileForm.valid){
      this.dataService.setData(this.profileForm.value);
      this.profileForm.reset();
    }

  }

}
