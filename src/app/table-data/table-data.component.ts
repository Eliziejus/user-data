import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {Profile} from "../models/profile.model";
import {Data} from "@angular/router";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent {

  @Input() profiles: Profile[] = [];

  constructor(private dataService: DataService, private ref: ChangeDetectorRef
  ) {
  }

  public getDate(birthday: string) {
    let today = new Date();
    let birth = new Date(birthday);
    let age = today.getFullYear() - birth.getFullYear();
    return age;
  }

  clickMethod(name: string) {
    if (confirm("Are you sure to delete " + name)) {
      // this.profiles.forEach((item) => item.unsubscribe())
    }
  }

}
