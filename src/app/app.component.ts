import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-page';
  public loginUrl = ['/', '/login' ];
  constructor(private router: Router) {
    router.events.forEach((event) => {
      const token = localStorage.getItem('token');
      if(event instanceof NavigationStart && !this.loginUrl.includes(event.url) ) {
        if (!token) {
          router.navigate(['/']);
        }
      }
    });
  };
}
