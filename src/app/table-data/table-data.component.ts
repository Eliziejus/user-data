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
  public rowId: number;
  public searchValue: string

  constructor(private cdr: ChangeDetectorRef, private router: Router, private dataService: DataService, private modalService: ModalService) {
  }


  public deleteProfileItem(modalId: string, id: number): void {
    this.rowId = id;
    this.modalService.open(modalId);
  }

  public deleteProfileItemInModal(modalId: string): void {
    this.profiles.splice(this.rowId, 1);
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
