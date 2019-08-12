import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesModule } from './employees/employees.module';

import { DataEmployeeService } from './employees/services/data-employee.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EmployeesModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataEmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
