import { Component, OnInit } from '@angular/core';
import { AddEmployeeService } from '../services/add-employee.service';
import { DataEmployeeService } from '../services/data-employee.service';
import { RoomAddService } from 'src/app/rooms/services/room-add.service';
import { RoomService } from 'src/app/rooms/services/room.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { Room } from 'src/app/rooms/models/room';
import { Desk } from 'src/app/rooms/models/desk';

@Component({
  selector: 'app-employee-add-second',
  templateUrl: './employee-add-second.component.html',
  styleUrls: ['./employee-add-second.component.scss']
})
export class EmployeeAddSecondComponent implements OnInit {

  employee: Employee;
  room: Room;

  err = '';

  constructor(
    private empAddService: AddEmployeeService,
    private empService: DataEmployeeService,
    private roomAddService: RoomAddService,
    private roomService: RoomService,
    private router: Router
  ) {
    empAddService.getEmpObs().subscribe(emp => this.employee = emp);
    roomAddService.setRoom(this.roomService.getRoom(this.employee.room));
    roomAddService.getRoomObs().subscribe(room => this.room = room);
  }

  ngOnInit() {
  }

  submit() {
    try {
      // tslint:disable-next-line: no-unused-expression
      if (this.room.desks.filter(desk => desk.empId === this.employee.id).length !== 1) {
        console.log(this.room.desks.filter(desk => desk.empId === this.employee.id).length);
        throw new Error('Choose desk for Employee');
      }

      this.empService.add(this.employee);
      this.roomService.delateByNb(this.room.nb);
      this.roomService.add(this.room);

      this.router.navigate(['/employees']);
    } catch (e) {
      this.err = e;
    }
  }

  back() {
    this.router.navigate(['/employees/add']);
  }

}
