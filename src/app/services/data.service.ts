import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Profile} from "../models/profile.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private profile: Profile[];
  public profileData = new BehaviorSubject<Profile[]>([]);

  public setData(profile: Profile[]){
    this.profileData.next(this.profileData.value.concat(profile));
    localStorage.setItem('app', JSON.stringify(this.profileData.value));
    return JSON.parse(localStorage.getItem('app') || '[]');
  }

  public getData() { //TOdo change namel nužsetinti profile data nesvarbu ar yra ar nera duomenu
    return JSON.parse(localStorage.getItem('app') || '[]');

  }


}
