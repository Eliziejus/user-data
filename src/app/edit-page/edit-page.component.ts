import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../services/data.service";
import {Profile} from "../models/profile.model";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  public profileData: Profile;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.profileData = this.dataService.getProfileById(parseInt(this.route.snapshot.params['id'], 10)); // radix you can parse
  }

  public updateProfile(profile: Profile) {
    this.dataService.updateProfile(profile);
  }

}
