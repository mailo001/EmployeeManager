import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { DataEmployeeService } from '../services/data-employee.service';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/rooms/services/room.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  empList: Array<Employee> = [ ];

  constructor(
    private empService: DataEmployeeService,
    private roomService: RoomService,
    private router: Router
  ) {
    this.empService.getEmpListObs().subscribe(
      (emps: Array<Employee>) => {this.empList = emps; }
    );
  }

  ngOnInit() {
  }

  empEdit(emp: Employee) {
    this.router.navigate(['/employee', emp.id]);
  }

  empDelete(emp: Employee) {
    this.roomService.delateEmpOfRoom(emp.room, emp.id);
    this.empService.delate(emp);
  }

}
