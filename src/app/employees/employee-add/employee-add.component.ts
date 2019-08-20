import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';
import { DataEmployeeService } from '../services/data-employee.service';
import { PositionService } from 'src/app/positions/services/position.service';
import { Position } from 'src/app/positions/models/position';
import { Room } from 'src/app/rooms/models/room';
import { RoomService } from 'src/app/rooms/services/room.service';

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

  posList: Array<Position>;
  roomListFree: Array<Room>;

  constructor(
    private router: Router,
    private empService: DataEmployeeService,
    private positionService: PositionService,
    private roomService: RoomService
  ) {
    this.positionService.getPositionListObs().subscribe(pos => this.posList = pos);
    this.roomService.getRoomListObs().subscribe(
      (rooms): Array<Room> => this.roomListFree = rooms.filter(r => r.load < r.maxLoad));
  }

  ngOnInit() {
    this.id = this.empService.getFreeId();
  }

  add() {

    try {
      const pos = this.posList.find(p => p.name === this.position);
      if (pos.minSalary > this.salary || pos.maxSalary < this.salary) {
        throw new Error('Wrong Salary! '
        + pos.minSalary + ' <= Salary <= ' + pos.maxSalary);
      }

      const empNew: Employee = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        position: this.position,
        room: this.room,
        salary: this.salary
      };

      this.empService.add(empNew);

      this.roomService.addEmpToRoom(this.room);

      this.id = this.empService.getFreeId();
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
