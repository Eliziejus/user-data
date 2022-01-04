import { Component, Input, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
  providers: [DataService],
})
export class TableDataComponent implements OnInit {

  @Input() profiles: any = [];

  constructor() {

  }

  ngOnInit(): void {
  }



}
