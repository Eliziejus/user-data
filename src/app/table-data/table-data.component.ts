import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {Profile} from "../models/profile.model";
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent {

  @Input() profiles: Profile[];

  constructor(private cdr: ChangeDetectorRef, private router: Router, private dataService: DataService) {
  }

  public deteleTableItem(name: string, id: number) { // Delete selected row in localstorage and table
    if (confirm(`Are you sure to delete ${name}`)) { // pop up confirmation if user really wanna delete person
      this.profiles.splice(id, 1);
      localStorage.setItem('app', JSON.stringify(this.profiles));
    }
  }

  public editProfileData(id: number) {
    this.router.navigate(['/edit', id]) // redirect to edit page by id
  }

  public delete(): void {
    this.dataService.deleteAll();
    this.profiles = [];

  }

}
