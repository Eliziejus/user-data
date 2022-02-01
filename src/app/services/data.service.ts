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

  public setData(profile: Profile) { // Set Data to localStorage, also change behaviorSubject
    const value = JSON.parse(localStorage.getItem('app') || '[]')
    value.push(profile); // Add new array in current array
    this.profileData.next(value);
    localStorage.setItem('app', JSON.stringify(value));
  }

  public getData() { //get data from localstorage
    return JSON.parse(localStorage.getItem('app') || '[]');
  }

  // public getProfile(id: number) {
  //   return this.httpClient.get<Profile>(`http://localhost:4200/${id}`)
  // }

}
//TODO truskta rodyklės prie age sortinimo
//TODO Literaliai paziureti ar visus punktus ivykdyti ir pratestuoti
// Padaryti su message kurie informuoti ar tai neužpildytas ar neatitinka validacijos
// TODOnepamiršti padaryti mobile friendly screen
