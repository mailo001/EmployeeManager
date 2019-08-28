import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Desk, WidthDesk, HeightDesk } from 'src/app/rooms/models/desk';
import { RoomAddService } from 'src/app/rooms/services/room-add.service';
import { Room } from 'src/app/rooms/models/room';
import { Employee } from 'src/app/employees/models/employee';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {

  @Input()
  edit: boolean;

  @Input()
  addEmp: boolean;

  @Input()
  emp: Employee;

  widthRoom = 1000;
  heightRoom = 600;
  wall = 20;
  viewBox = '0 0 ' + this.widthRoom.toString() + ' ' + this.heightRoom.toString();

  widthWindow = 700;
  heightWindow = this.widthWindow * this.heightRoom / this.widthRoom;

  desks: Array<Desk> = [
    { id: 0, x: 10, y: 10, rotate: 0, colision: false, employee: true, empId: 0},
    { id: 1, x: 10, y: 200, rotate: 90, colision: false, employee: false}
  ];

  widthDesk = WidthDesk;
  heightDesk = HeightDesk;

  id: number;
  isclick = false;
  mouseX: number;
  mouseY: number;
  lastX: number;
  lastY: number;

  colision = false;

  constructor(private roomAddService: RoomAddService) {
    this.roomAddService.getRoomObs().subscribe((room: Room) => {
      this.widthRoom = room.width;
      this.heightRoom = room.height;
      this.desks = room.desks;
    });

    this.viewBox = '0 0 ' + this.widthRoom.toString() + ' ' + this.heightRoom.toString();

    this.widthWindow = 700;
    this.heightWindow = this.widthWindow * this.heightRoom / this.widthRoom;
  }

  ngOnInit() {
  }


  @HostListener('document:keypress', ['$event'])
  keypressCol(event: KeyboardEvent) {
    if (event.key === 'z' && this.edit === true) {
      this.colision = true;
    }
    if (event.key === 'x' && this.id !== null && this.edit === true) {
      this.rotate(this.id);
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyupNoCol(event: KeyboardEvent) {
    if (event.key === 'z' && this.edit === true) {
      this.colision = false;
    }
  }

  rotate(id: number) {
    this.desks.find(d => d.id === id).rotate += 90;
    if (this.desks.find(d => d.id === id).rotate >= 360) {
      this.desks.find(d => d.id === id).rotate -= 360;
    }
  }

  addEmployee(id: number, d: Desk) {
    if (this.addEmp === true && d.employee === false) {
      this.desks.forEach((desk: Desk) => {
        if (desk.id === id) {
          desk.employee = true;
          desk.empId = this.emp.id;
        } else if (desk.employee === true) {
          if (desk.empId === this.emp.id) {
            desk.employee = false;
            desk.empId = null;
          }
        }
      });
      this.roomAddService.uppdateDesks(this.desks);
    }
  }

  clik(event: MouseEvent, id: number) {
    if (this.edit === true) {
      this.id = id;
      this.isclick = true;
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
      this.lastX = this.desks[this.id].x;
      this.lastY = this.desks[this.id].y;
    }
  }

  move(event: MouseEvent) {

    if (this.isclick) {
      if (
        this.wall / 2
        <= this.desks[this.id].x + event.movementX * this.widthRoom / this.widthWindow
        &&
        this.desks[this.id].x + event.movementX * this.widthRoom / this.widthWindow
        + this.widthDesk
        <= this.widthRoom - this.wall / 2
        &&
        this.wall / 2
        <= this.desks[this.id].y + event.movementY * this.heightRoom / this.heightWindow
        &&
        this.desks[this.id].y + event.movementY * this.heightRoom / this.heightWindow
        + this.heightDesk
        <= this.heightRoom - this.wall / 2
      ) {
        let c = 0;
        this.desks.forEach(desk => {
          if (desk.id !== this.id) {
            if (
              desk.x <= this.desks[this.id].x + this.widthDesk
              + event.movementX * this.widthRoom / this.widthWindow
              &&
              this.desks[this.id].x + event.movementX * this.widthRoom / this.widthWindow
              <= desk.x + this.widthDesk
              &&
              desk.y <= this.desks[this.id].y + this.heightDesk
              + event.movementY * this.heightRoom / this.heightWindow
              &&
              this.desks[this.id].y + event.movementY * this.heightRoom / this.heightWindow
              <= desk.y + this.heightDesk
            ) {
              if (this.colision === true) {
                desk.colision = true;
                this.desks[this.id].colision = true;
              }
              c++;
            } else {
              desk.colision = false;
            }
          }
        });

        if (c === 0 || this.colision === true) {
          if (c === 0) {
            this.desks[this.id].colision = false;
          }
          this.desks[this.id].x += event.movementX * this.widthRoom / this.widthWindow;
          this.desks[this.id].y += event.movementY * this.heightRoom / this.heightWindow;
        }
      }
    }
  }

  unclick(event: MouseEvent) {
    if (this.edit === true) {
      this.id = null;
      this.isclick = false;
      this.roomAddService.uppdateDesks(this.desks);
    }
  }

}
