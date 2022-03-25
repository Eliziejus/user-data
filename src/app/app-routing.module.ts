import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {UserFormDisplayComponent} from "./user-form-display/user-form-display.component";

const router: Routes = [
  { path: 'form', component: OverviewPageComponent },
  { path: 'edit/:id', component: EditPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: UserFormDisplayComponent},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(router),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
