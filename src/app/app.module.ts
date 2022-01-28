import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { TableDataComponent } from './table-data/table-data.component';
import {DataService} from "./services/data.service";
import {HttpClientModule} from "@angular/common/http";
import { SortDirective } from './directive/sort.directive';
import {ConfirmBoxConfigModule, NgxAwesomePopupModule} from "@costlydeveloper/ngx-awesome-popup";

@NgModule({
  declarations: [
    AppComponent,
    FormFieldsComponent,
    HeaderComponent,
    TableDataComponent,
    SortDirective,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxAwesomePopupModule.forRoot(),
    ConfirmBoxConfigModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
