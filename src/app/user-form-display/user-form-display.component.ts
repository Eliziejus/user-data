import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {FormField} from "../enums/form-field.enums";

@Component({
  selector: 'app-user-form-display',
  templateUrl: './user-form-display.component.html',
  styleUrls: ['./user-form-display.component.scss']
})
export class UserFormDisplayComponent implements OnInit {

  constructor( public userService: UserService, public formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
  }
}
