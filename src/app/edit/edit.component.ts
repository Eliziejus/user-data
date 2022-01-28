import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../services/data.service";
import {Profile} from "../models/profile.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const profileId = params.get('id') as null;
      if(profileId) {
        this.getProfileData(profileId);
      }
    });
  }

  getProfileData(id: number) {
    this.dataService.getProfile(id).subscribe(
      (profile: Profile) => this.editProfile(profile),
    );
  }

  editProfile(profile: Profile){
    this.profileForm.patchValue({
      name: profile.name,
      surname: profile.surname,
      birthday: profile.birthday,
      gender: profile.gender,
      phoneNumber: profile.phoneNumber,
      personalId: profile.personalId,
    });
  }

}
