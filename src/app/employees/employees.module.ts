import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { FormsModule } from '@angular/forms';
import { EmployeeAddSecondComponent } from './employee-add-second/employee-add-second.component';
import { RoomCreateComponent } from './room-create/room-create.component';



@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeAddComponent,
    EmployeeAddSecondComponent,
    RoomCreateComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule
  ]
})
export class EmployeesModule { }
