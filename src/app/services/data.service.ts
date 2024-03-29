import {BehaviorSubject} from "rxjs";
import {Profile} from "../models/profile.model";

export class DataService {
  public profileData = new BehaviorSubject<Profile[]>([]);

  public setData(profile: Profile): void { // Set Data to localStorage, also change behaviorSubject
    const value = JSON.parse(localStorage.getItem('app') || '[]')
    value.push(profile); // Add new array in current array
    value.sort((a: Profile, b: Profile) => {
      return this.getAge(a.birthday) - this.getAge(b.birthday)
    });
    this.profileData.next(value);
    localStorage.setItem('app', JSON.stringify(value));
  }

  public initStorage(): void {
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
    localStorage.setItem('app', JSON.stringify(profile));
    debugger;
  }

  public getProfileById(id: number): Profile {
    if (this.profileData.getValue().length === 0) {
      this.initStorage();
    }
    const data = (JSON.parse(localStorage.getItem('app') || '[]') as Profile[]).find((item) => item.personalId === id);
    if (!data) {
      return {} as Profile
    }
    return data;
  }

  public getAge(birthday: string): number { // convert date to age
    let today = new Date(); //set today date
    let birth = new Date(birthday); //set selected date from form
    let age = today.getFullYear() - birth.getFullYear(); // calculate age
    return age;
  }

  public deleteAll(): void { // Erase all data form table and localstorage
      localStorage.removeItem('app'); //remove all data form LocalStorage
  }
}
