import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
  providers: [DataService],

})
export class TableDataComponent implements OnInit {
  tableData = [];

  constructor(public dataService: DataService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {

    this.dataService.getData().subscribe(data => {
      console.log(data);
    })
    console.log(...this.tableData);
  }
}
