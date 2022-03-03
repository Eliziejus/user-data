import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {Profile} from "../models/profile.model";
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ModalService} from "../modal/service/modal.service";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent {

  @Input() profiles: Profile[];
  public personalId: number;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private dataService: DataService, private modalService: ModalService) {
  }

  public deteleTableItem(id: string, name?: string,): void { // Delete selected row in localstorage and table
    // this.modalService.open(id);
    // if (confirm(`Are you sure to delete ${name}`)) { // pop up confirmation if user really wanna delete person
    //   this.profiles.splice(id, 1);
    // }
  }

  public deleteProfileItem(modalId: string, id: number): void {
    this.personalId = id;
    this.modalService.open(modalId);
  }

  public deleteProfileItemInModal(modalId: string): void {
    this.profiles.splice(this.personalId, 1);
    localStorage.setItem('app', JSON.stringify(this.profiles))
    this.modalService.open(modalId);
    this.closeModal('question-modal');
  }


  public closeModal(modalId: string): void {
    this.modalService.close(modalId);
  }

  public editProfileData(id: number): void {
    this.router.navigate(['/edit', id]) // redirect to edit page by id
  }

  public deleteAll(modalId: string): void {
    this.modalService.open(modalId);
  }

  public deleteAllInModal(modalId: string): void {
    this.modalService.open(modalId);
    this.dataService.deleteAll();
    this.profiles = [];
    this.closeModal('question-modal-for-all');
  }

}
