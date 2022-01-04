import {ChangeDetectionStrategy, Component, OnInit,} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {Gender} from "../models/gender.model";

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldsComponent implements OnInit {


  profileData: any;
  public data: any = [];

  genderArray = [
    new Gender('1', 'Male'),
    new Gender('2', 'Female'),
    new Gender('3', 'I dont know'),

  ];

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.profileData = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      personalId: [this.getPersonalId()]
    });
    this.data.subscribe();
  }

  public getPersonalId() {
    return Math.floor((Math.random() * 100) + 1);
  };

  get name() {
    return this.profileData.get('name');
  }

  get surname() {
    return this.profileData.get('surname');
  }

  get birthday() {
    return this.profileData.get('birthday');
  }

  get gender() {
    return this.profileData.get('gender');
  }

  get phoneNumber() {
    return this.profileData.get('phoneNumber');
  }


  public addData(): void {
    const save = this.profileData.value;
    this.data.push(save);
    console.log(save);
    this.addSomeData(save);
    this.ngOnInit();
  }

  public addSomeData(save: any) {
    let profileStorage: any = [];
    if (localStorage.getItem('app.data')){
      profileStorage = localStorage.getItem('app.data');
      profileStorage = [save, ...profileStorage];
    }else {
      profileStorage = [save];
    }
    localStorage.setItem('app.data', JSON.stringify(save));

  }

}
