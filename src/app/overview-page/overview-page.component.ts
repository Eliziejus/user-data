import { Component, OnInit } from '@angular/core';
import {Profile} from "../models/profile.model";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  constructor(private dataService: DataService) { }


  public profilesList: Profile[];

  public ngOnInit(): void {  //TODO more analalyze code...
    this.dataService.initStorage();
    this.dataService.profileData.subscribe((profiles) => {
      this.profilesList = profiles;

      const loader = document.getElementById('loading');
      if (loader!.className === 'loading-none') {
        loader!.className = 'loading';
      }
      setTimeout(() => {
        loader!.className = 'loading-none';
      }, 999);
    })
  }

  public saveProfile(profile: Profile): void {
    this.dataService.setData(profile);
  }

}
