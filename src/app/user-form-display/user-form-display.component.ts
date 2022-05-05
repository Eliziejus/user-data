import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {FormField} from "../enums/form-field.enums";
import {ModalService} from "../modal/service/modal.service";

@Component({
  selector: 'app-user-form-display',
  templateUrl: './user-form-display.component.html',
  styleUrls: ['./user-form-display.component.scss']
})
export class UserFormDisplayComponent implements OnInit {

  constructor( public userService: UserService, public formBuilder: FormBuilder, private modalService: ModalService) {
  }

  public ngOnInit(): void {
  }

  public closeModal(modalId: string): void {
    this.modalService.close(modalId);
  }
}
