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
import { PositionModule } from './positions/position.module';
import { PositionService } from './positions/services/position.service';

import { StorageServiceModule } from 'ngx-webstorage-service';
import { RoomAddService } from './rooms/services/room-add.service';

@NgModule({
  declarations: [
    AppComponent,
    NavybarComponent
  ],
  imports: [
    BrowserModule,
    // tslint:disable-next-line: deprecation
    StorageServiceModule,
    PositionModule,
    RoomModule,
    EmployeesModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    RoomAddService,
    RoomService,
    PositionService,
    DataEmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
