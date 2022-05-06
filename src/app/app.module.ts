import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { TableDataComponent } from './table-data/table-data.component';
import {DataService} from "./services/data.service";
import {HttpClientModule} from "@angular/common/http";
import { SortDirective } from './directive/sort.directive';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import {GetDataPipe} from "./pipes/get-data.pipe";
import {DatePipe} from "@angular/common";
import { ModalComponent } from './modal/modal.component';
import { SearchFilterPipePipe } from './pipes/search-filter-pipe.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserFormDisplayComponent } from './user-form-display/user-form-display.component';
import { ReuseComponent } from './reuse/reuse.component';


@NgModule({
  declarations: [
    AppComponent,
    FormFieldsComponent,
    HeaderComponent,
    TableDataComponent,
    SortDirective,
    EditPageComponent,
    OverviewPageComponent,
    GetDataPipe,
    ModalComponent,
    SearchFilterPipePipe,
    LoginComponent,
    RegisterComponent,
    UserFormDisplayComponent,
    ReuseComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DataService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
