import { Component, Input, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {Profile} from "../models/profile.model";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {

  @Input() profiles:Profile[] = [];

  constructor(private dataService: DataService) {

  }

  ngOnInit(){

    this.profiles = [...this.dataService.getData()];
    console.log(this.profiles);
  }

  public getDate(birthday: any) {
    let today = new Date();
    let birth = new Date(birthday);
    let age = today.getFullYear() - birth.getFullYear();
    return age;
  }

  clickMethod(name: string) {
    if(confirm("Are you sure to delete "+name)) {
      console.log("Implement delete functionality here");
      localStorage.removeItem('app');
    }
  }

}
