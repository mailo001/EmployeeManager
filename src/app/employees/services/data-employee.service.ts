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
    this.empList = this.storage.get(STORAGE_KEY) || [];
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
