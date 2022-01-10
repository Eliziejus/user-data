import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {Gender} from "../models/gender.model";
import {countries} from "../country-data-store";
import { DatePipe } from "@angular/common";


@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
  providers: [DataService],
})
export class FormFieldsComponent implements OnInit {

  public countries: any = countries;
  public profileForm: FormGroup;
  public data: any = [];
  public now: any;

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
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required,],
      gender: ['', Validators.required],
      phoneNumber: ['86',  [ Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
        Validators.minLength(11), Validators.maxLength(11)]],
      personalId: [this.getPersonalId()],
    });

    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd')
  }

  public getPersonalId() {
    return Math.floor((Math.random() * 100) + 1);
  };

  public addData() {
    this.dataService.setData(this.profileForm.value)
  }

}
