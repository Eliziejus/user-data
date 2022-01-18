import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {Profile} from "../models/profile.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnChanges{

  @Input() profiles: Profile[];

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router){
  }

  public getDate(birthday: string) {
    let today = new Date();
    let birth = new Date(birthday);
    let age = today.getFullYear() - birth.getFullYear();
    return age;
  }

  deteleTableItem(name: string, id: number) {
    if (confirm("Are you sure to delete " + name)) {
      this.profiles.splice(id, 1);
      localStorage.setItem('app', JSON.stringify(this.profiles));
    }
  }

  public ngOnChanges() {
    this.cdr.detectChanges();

  }

  editProfileData(id: number){
    this.router.navigate(['/edit', id])
  }

}
