import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormFieldsComponent} from "./form-fields/form-fields.component";

const router: Routes = [
  { path: 'form', component: FormFieldsComponent },
  { path: 'edit/:id', component: FormFieldsComponent },
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
