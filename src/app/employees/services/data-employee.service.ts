import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataEmployeeService {

  private empList: Array<Employee> = [
    {
      id: 1,
      firstName: 'Jas',
      lastName: 'Kowalski',
      position: 'Programista',
      room: 3,
      salary: 5000
    },
    {
      id: 2,
      firstName: 'Adam',
      lastName: 'Nowak',
      position: 'Pracownik Socjalny',
      room: 15,
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
    return this.empList.find(emp => emp.id === +id);
  }

  checkId(emp: Employee): number {
    return this.empList.filter(e => e.id === emp.id).length;
  }

  add(emp: Employee) {
    if (this.checkId(emp) !== 0) {
      throw new Error('Wrong Id(add)');
    }
    this.empList.push(emp);
    this.empListObs.next(this.empList);
  }

  delate(emp: Employee) {
    this.empList = this.empList.filter(e => e !== emp);
    this.empListObs.next(this.empList);
  }

  edit(empOld: Employee, empNew: Employee) {
    if (this.checkId(empNew)  === 1) {
      if (empNew.id !== empOld.id) {
        throw new Error('Wrong Id!');
      }
    }
    this.delate(empOld);
    this.add(empNew);
    this.empListObs.next(this.empList);
  }
}
