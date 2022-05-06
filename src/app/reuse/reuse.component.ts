import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-reuse',
  templateUrl: './reuse.component.html',
  styleUrls: ['./reuse.component.scss']
})
export class ReuseComponent implements OnInit {

  @Input()
  public email: any;
  @Input()
  public password: any;
  @Input()
  public confirmPassword?: any;

  constructor() { }

  ngOnInit(): void {

  }

}
