import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEmployeeService } from '../services/data-employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  empOld: Employee;
  empNew: Employee;

  id: number ;
  firstName = '';
  lastName = '';
  position = '';
  room: number;
  salary: number;

  errtext = '';
  err = true;
  color = 'good';

  constructor(
    private router: Router,
    private empService: DataEmployeeService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.empOld = this.empService.getEmployee(id);
    this.empNew = this.empService.getEmployee(id);

    this.id = this.empOld.id;
    this.firstName = this.empOld.firstName;
    this.lastName = this.empOld.lastName;
    this.position = this.empOld.position;
    this.room = this.empOld.room;
    this.salary = this.empOld.salary;
    console.log('con');
  }

  ngOnInit() {
  }

  edit() {
    try {
      const empCon: Employee = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        position: this.position,
        room: this.room,
        salary: this.salary
      };

      this.empService.edit(this.empOld, empCon);
      this.empOld = this.empNew;
      this.back();
    } catch (e) {
      this.color = 'bad';
      this.errtext = e;
    }
  }

  back() {
    this.router.navigate(['/employees']);
  }
}
