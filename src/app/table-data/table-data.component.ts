import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
  providers: [DataService],

})
export class TableDataComponent implements OnInit {
  tableData = [];

  constructor(public dataService: DataService, private router: Router) {
    this.dataService = dataService;
  }

  ngOnInit(): void {
    console.log(this.profileData);
  }
}
