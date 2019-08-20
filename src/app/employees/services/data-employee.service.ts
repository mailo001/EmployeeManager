import { Inject, Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'local_employee';

@Injectable({
  providedIn: 'root'
})
export class DataEmployeeService {

  private empList: Array<Employee> = [];

  private empListObs = new BehaviorSubject<Array<Employee>>([]);

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.empList = this.storage.get(STORAGE_KEY) || [
      {
        id: 0,
        firstName: 'Olaf',
        lastName: 'Burak',
        room: 2,
        position: 'Dyrektor',
        salary: 15000
      },
      {
        id: 1,
        firstName: 'Jan',
        lastName: 'Kowalski',
        room: 10,
        position: 'Programista',
        salary: 6000
      },
      {
        id: 2,
        firstName: 'Jakub',
        lastName: 'Nowak',
        room: 11,
        position: 'Tester',
        salary: 4000
      }
    ];
    this.storage.set(STORAGE_KEY, this.empList);
    this.empListObs.next(this.empList);
  }

  getEmpListObs(): Observable<Array<Employee>> {
    return this.empListObs.asObservable();
  }

  getFreeId(): number {
    return this.empList.sort((e1, e2) => e2.id - e1.id)[0].id + 1;
  }

  isPosFree(pos: string): any {
    if (this.empList.filter(e => e.position === pos).length === 0) {
      return true;
    }
    return false;
  }

  getEmployee(id: number | string): Employee {
    return this.empList.find(emp => emp.id === +id);
  }

  getEmpList(): Array<Employee> {
    return this.empList;
  }

  checkId(emp: Employee): number {
    return this.empList.filter(e => e.id === emp.id).length;
  }

  add(emp: Employee) {
    if (this.checkId(emp) !== 0) {
      throw new Error('Wrong Id!');
    }
    this.empList.push(emp);
    this.empListObs.next(this.empList);
    this.storage.set(STORAGE_KEY, this.empList);
  }

  delate(emp: Employee) {
    this.empList = this.empList.filter(e => e !== emp);
    this.empListObs.next(this.empList);
    this.storage.set(STORAGE_KEY, this.empList);
  }

  edit(empOld: Employee, empNew: Employee) {
    if (this.checkId(empNew)  >= 1) {
      if (empNew.id !== empOld.id) {
        throw new Error('Wrong Id!');
      }
    }
    this.delate(empOld);
    this.add(empNew);
    this.empListObs.next(this.empList);
    this.storage.set(STORAGE_KEY, this.empList);
  }
}
