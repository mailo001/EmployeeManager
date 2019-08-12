import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { DataEmployeeService } from '../services/data-employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  empList: Array<Employee> = [ ];

  constructor(
    private empService: DataEmployeeService,
    private router: Router,
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

  empDelate(emp: Employee) {
    this.empService.delate(emp);
  }

}
