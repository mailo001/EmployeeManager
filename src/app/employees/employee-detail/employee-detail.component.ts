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
    this.empNew = this.empOld;
  }

  ngOnInit() {
  }

  edit() {
    try {
      this.empService.edit(this.empOld, this.empNew);
      this.empOld = this.empNew;
      this.back();
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
