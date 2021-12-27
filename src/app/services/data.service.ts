import {Injectable, Input} from "@angular/core";
import {BehaviorSubject, of, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public profileData = new BehaviorSubject([]);

  constructor(private router: Router) {
  }

  public setData(profile: any): void {
    this.profileData = profile
    console.log(this.profileData);
  }

  public getData() {
    console.log(this.profileData)
    return this.profileData;
  }


}
