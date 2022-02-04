import {BehaviorSubject} from "rxjs";
import {Profile} from "../models/profile.model";

export class DataService {
  public profileData = new BehaviorSubject<Profile[]>([]);

  constructor() {
  }

  public setData(profile: Profile) { // Set Data to localStorage, also change behaviorSubject
    const value = JSON.parse(localStorage.getItem('app') || '[]')
    value.push(profile); // Add new array in current array
    value.sort((a: Profile, b: Profile) => {
      return this.getAge(a.birthday) - this.getAge(b.birthday)
    });
    console.log(value);
    this.profileData.next(value);
    localStorage.setItem('app', JSON.stringify(value));
  }

  public initStorage() {
    const data = JSON.parse(localStorage.getItem('app') || '[]');
    data.sort((a: Profile, b: Profile) => {
      return this.getAge(a.birthday) - this.getAge(b.birthday)
    });

    this.profileData.next(data);
  }

  public updateProfile(profile: Profile): void {
    const profiles = JSON.parse(localStorage.getItem('app') || '[]');
    profiles.forEach((profileItem: Profile) => {
      if (profileItem.personalId === profile.personalId) {
        profileItem = profile;
      }
    });
    this.profileData.next(profiles);
    localStorage.setItem('app', JSON.stringify(profiles));
  }

  public getProfileById(id: number): Profile {
    if (this.profileData.getValue().length === 0) {
      this.initStorage();
    }
    const data = (JSON.parse(localStorage.getItem('app') || '[]') as Profile[]).find((item) => item.personalId === id);
    debugger;
    if (!data) {
      return {} as Profile
    }
    return data;
  }

  public getAge(birthday: string) { // convert date to age
    let today = new Date(); //set today date
    let birth = new Date(birthday); //set selected date from form
    let age = today.getFullYear() - birth.getFullYear(); // calculate age
    return age;
  }
}


//TODO truskta rodyklės prie age sortinimo
//TODO Literaliai paziureti ar visus punktus ivykdyti ir pratestuoti
// Padaryti su message kurie informuoti ar tai neužpildytas ar neatitinka validacijos
