import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataEmployeeService {

  private empList: Array<Employee> = [
    {
      id: 2,
      firstName: 'Jas',
      lastName: 'Kowalski',
      position: 'Programista',
      room: 12,
      salary: 5000
    },
    {
      id: 1,
      firstName: 'Adam',
      lastName: 'Nowak',
      position: 'Pracownik Socjalny',
      room: 26,
      salary: 2000
    },
  ];

  private empListObs = new BehaviorSubject<Array<Employee>>([]);

  constructor() {
    this.empListObs.next(this.empList);
  }

  getEmpListObs(): Observable<Array<Employee>> {
    return this.empListObs.asObservable();
  }

  getEmployee(id: number | string): Employee {
    // return this.getEmpListObs().pipe(
    //   map((emps: Array<Employee>) => emps.find(
    //     emp => emp.id === +id
    //   ))
    // );
    return this.empList.find(emp => emp.id === +id);
  }

  add(emp: Employee) {
    this.empList.push(emp);
    this.empListObs.next(this.empList);
  }

  delate(emp: Employee) {
    this.empList = this.empList.filter(e => e !== emp);
    this.empListObs.next(this.empList);
  }

  edit(empOld: Employee, empNew: Employee) {
    this.delate(empOld);
    this.add(empNew);
    this.empListObs.next(this.empList);
  }
}
