import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {map} from "rxjs";

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss']
})
export class FormFieldsComponent implements OnInit {

  public profileData = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    birthday: new FormControl(''),
    gender: new FormControl(''),
    phoneNumber: new FormControl(''),
  })


  constructor() {
  }

  ngOnInit(): void {
  }

  public showData(): void {

    console.log(this.profileData);
  }

}
