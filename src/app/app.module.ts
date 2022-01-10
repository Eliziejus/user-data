import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { TableDataComponent } from './table-data/table-data.component';
import {DataService} from "./services/data.service";
import {HttpClientModule} from "@angular/common/http";
import { SortDirective } from './directive/sort.directive';
import {ConfirmBoxConfigModule, NgxAwesomePopupModule} from "@costlydeveloper/ngx-awesome-popup";

const router: Routes = [
  { path: 'form', component: FormFieldsComponent },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    FormFieldsComponent,
    HeaderComponent,
    HomePageComponent,
    TableDataComponent,
    SortDirective,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(router),
    AppRoutingModule,
    HttpClientModule,
    NgxAwesomePopupModule.forRoot(),
    ConfirmBoxConfigModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
