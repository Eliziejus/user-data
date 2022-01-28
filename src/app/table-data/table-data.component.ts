import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {Profile} from "../models/profile.model";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent {

  @Input() profiles: Profile[];

  constructor(private cdr: ChangeDetectorRef, private router: Router){
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


  editProfileData(id: number){
    this.router.navigate(['/edit', id])
  }

}
