import {Injectable} from "@angular/core";
import {BehaviorSubject, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public profileData = new Subject<any>();
  public sharedData = this.profileData.asObservable();

  constructor() {
  }

  public setData(profileData: any[]): void {
    console.log(profileData);
    return this.profileData.next(profileData);
  }

  public getData() {
    console.log(this.sharedData);
    return of(this.sharedData);
  }


}
