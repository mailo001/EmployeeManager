import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';
import { DataEmployeeService } from '../services/data-employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  id: number ;
  firstName = '';
  lastName = '';
  position = '';
  room: number;
  salary: number;

  // null: number;

  errtext = '';
  color = 'good';

  constructor(
    private router: Router,
    private empService: DataEmployeeService ) { }

  ngOnInit() {
  }

  add() {

    try {
      const empNew: Employee = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        position: this.position,
        room: this.room,
        salary: this.salary
      };

      this.empService.add(empNew);

      this.id = null;
      this.firstName = '';
      this.lastName = '';
      this.position = '';
      this.room = null;
      this.salary = null;

      this.color = 'good';
      this.errtext = 'Success: Employee added!';

    } catch (e) {
      this.color = 'bad';
      this.errtext = e;
      console.log(e);
    }
  }

  back() {
    this.router.navigate(['/employees']);
  }

}
