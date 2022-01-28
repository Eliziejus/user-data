import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Profile} from "../models/profile.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public profileData = new BehaviorSubject<Profile[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  public setData(profile: Profile){
    const value = this.profileData.value
    value.push(profile);
    this.profileData.next(value);
    localStorage.setItem('app', JSON.stringify(value));
  }

  public getData() {
    return JSON.parse(localStorage.getItem('app') || '[]');
  }

  public getProfile(id: number) {
    return this.httpClient.get<Profile>(`http://localhost:4200/${id}`)
  }

}
