import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {Profile} from "../models/profile.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent{

  @Input() profiles: Profile[];

  constructor(private cdr: ChangeDetectorRef, private router: Router, private dataService: DataService){
  }

  public getDate(birthday: string) { // convert date to age
    let today = new Date(); //set today date
    let birth = new Date(birthday); //set selected date from form
    let age = today.getFullYear() - birth.getFullYear(); // calculate age
    return age;
  }

  deteleTableItem(name: string, id: number) { // Delete selected row in localstorage and table
    if (confirm("Are you sure to delete " + name)) { // pop up confirmation if user really wanna delete person
      this.profiles.splice(id, 1);
      localStorage.setItem('app', JSON.stringify(this.profiles));
    }
  }


  editProfileData(id: number){
    this.router.navigate(['/edit', id]) // redirect to edit page by id
  }

  public deleteAll(){ // Erase all data form table and localstorage
    if (confirm("Are you sure to erase all profiles? ")) {
      localStorage.removeItem('app'); //remove all data form LocalStorage
      this.profiles = [];
    }
  }

}
