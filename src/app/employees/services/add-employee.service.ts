import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeService {

  private employee: Employee;
  private empObs = new BehaviorSubject<Employee>(this.employee);

  constructor() {
    this.empObs.next(this.employee);
  }

  setEmp(emp: Employee) {
    this.employee = emp;
    this.empObs.next(this.employee);
  }

  getEmpObs(): Observable<Employee> {
    return this.empObs.asObservable();
  }
}
