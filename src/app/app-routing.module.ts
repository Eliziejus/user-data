import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {OverviewPageComponent} from "./overview-page/overview-page.component";

const router: Routes = [
  { path: 'form', component: OverviewPageComponent },
  { path: 'edit/:id', component: EditPageComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full'},
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
