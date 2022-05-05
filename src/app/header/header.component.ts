import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn$: Observable<boolean>;
  constructor( public userService: UserService) {
  }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.userService.isLogged;
  }

  public logout(): void {
    this.userService.logout();
  }
}
