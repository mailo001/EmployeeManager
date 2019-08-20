import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataEmployeeService } from '../services/data-employee.service';
import { Employee } from '../models/employee';
import { RoomService } from 'src/app/rooms/services/room.service';
import { PositionService } from 'src/app/positions/services/position.service';
import { Room } from 'src/app/rooms/models/room';
import { Position } from 'src/app/positions/models/position';

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

  roomListFree: Array<Room>;
  posList: Array<Position>;

  constructor(
    private router: Router,
    private empService: DataEmployeeService,
    private roomService: RoomService,
    private positionService: PositionService,
    private route: ActivatedRoute
  ) {
    this.roomService.getRoomListObs().subscribe(
      room => this.roomListFree = room.filter(r => r.load < r.maxLoad)
    );
    this.positionService.getPositionListObs().subscribe(pos => this.posList = pos);

    const id = this.route.snapshot.paramMap.get('id');

    this.empOld = this.empService.getEmployee(id);
    this.empNew = this.empService.getEmployee(id);

    if (this.roomListFree.filter(r => r.nb === this.empOld.room).length === 0) {
      this.roomListFree.push(this.roomService.getRoom(this.empOld.room));
    }

    this.id = this.empOld.id;
    this.firstName = this.empOld.firstName;
    this.lastName = this.empOld.lastName;
    this.position = this.empOld.position;
    this.room = this.empOld.room;
    this.salary = this.empOld.salary;
  }

  ngOnInit() {
  }

  edit() {
    try {
      const pos = this.positionService.getPosition(this.position);
      if (pos.minSalary > this.salary || pos.maxSalary < this.salary) {
        throw new Error('Wrong Salary! '
        + pos.minSalary + ' <= Salary <= ' + pos.maxSalary);
      }

      const empCon: Employee = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        position: this.position,
        room: this.room,
        salary: this.salary
      };

      this.empService.edit(this.empOld, empCon);

      this.roomService.delateEmpOfRoom(this.empOld.room);
      this.roomService.addEmpToRoom(this.room);

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
