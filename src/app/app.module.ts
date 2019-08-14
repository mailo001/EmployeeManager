import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesModule } from './employees/employees.module';

import { DataEmployeeService } from './employees/services/data-employee.service';
import { RoomModule } from './rooms/room.module';
import { RoomService } from './rooms/services/room.service';
import { NavybarComponent } from './navybar/navybar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavybarComponent
  ],
  imports: [
    BrowserModule,
    RoomModule,
    EmployeesModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    RoomService,
    DataEmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
