import {Injectable} from "@angular/core";
import {BehaviorSubject, of, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public profileData = new Subject<any>();
  public sharedData = this.profileData.asObservable();

  constructor(private router: Router) {
  }

  public setData(profileData: any[]): void {
    console.log(profileData);
    return this.profileData.next(profileData);
  }

  public getData() {
    this.router.navigate(['/table'], this.sharedData);
    return of(this.sharedData);
  }


}
