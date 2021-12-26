import {Component, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
  providers: [DataService],
})
export class FormFieldsComponent implements OnInit {

  public profileData: any = [];
  public tableData: any = [];
  genderArray: any = ['Male', 'Female', 'I dont know'];

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    private router: Router
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

  changeGender(event: any){
    this.gender.setValue(event.target, {
      onlySelf: true
    })
  }

  get phoneNumber() {
    return this.profileData.get('phoneNumber');
  }



  public addData(): void {
    this.dataService.setData(this.profileData.value)
    this.ngOnInit();
  }

}
