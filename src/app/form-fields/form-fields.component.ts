import {Component, Input, OnInit,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";
import {Profile} from "../models/profile.model";

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
  providers: [DataService],
})
export class FormFieldsComponent implements OnInit {


  @Input() public profileData: any = FormGroup;
  genderArray: any = ['Male', 'Female', 'I dont know'];

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
  ) {
  }

  ngOnInit(): void {
    this.profileData = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

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

  changeGender(event: any) {
    this.gender.setValue(event.target, {
      onlySelf: true
    })
  }

  get phoneNumber() {
    return this.profileData.get('phoneNumber');
  }


  public addData(): void {
    const data = this.dataService.setData(this.profileData.value)
    this.ngOnInit();
  }

}
