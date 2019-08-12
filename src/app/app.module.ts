import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesModule } from './employees/employees.module';

import { DataEmployeeService } from './employees/data-employee.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EmployeesModule,
    AppRoutingModule,
  ],
  providers: [DataEmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
