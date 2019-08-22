import { Component, OnInit } from '@angular/core';
import { Desk } from '../models/desk';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {

  widthRoom = 1000;
  heightRoom = 600;
  wall = 20;
  viewBox = '0 0 ' + this.widthRoom.toString() + ' ' + this.heightRoom.toString();

  widthWindow = 700;
  heightWindow = this.widthWindow * this.heightRoom / this.widthRoom;

  desks: Array<Desk> = [{ id: 0, x: 10, y: 10, rotate: 0, employee: true, empId: 0},
    { id: 1, x: 10, y: 200, rotate: 90, employee: false}];

  widthDesk = 100;
  heightDesk = 100;

  id: number;
  isclick = false;
  mouseX: number;
  mouseY: number;
  lastX: number;
  lastY: number;

  constructor() { }

  ngOnInit() {
  }

  visibilyty(desk: Desk) {
    if (desk.employee) {
      return 'visible';
    }
    return 'hidden';

  }

  rotate(id: number) {
    this.desks.find(d => d.id === id).rotate += 90;
    if (this.desks.find(d => d.id === id).rotate >= 360) {
      this.desks.find(d => d.id === id).rotate -= 360;
    }
  }

  clik(event: MouseEvent) {
    // tslint:disable-next-line: deprecation
    this.id = +event.toElement.id;
    this.isclick = true;
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
    this.lastX = this.desks[this.id].x;
    this.lastY = this.desks[this.id].y;
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
            c++;
          }
        });

        if (c === 1) {
          this.desks[this.id].x += event.movementX * this.widthRoom / this.widthWindow;
          this.desks[this.id].y += event.movementY * this.heightRoom / this.heightWindow;
        }
      }
    }
  }

  unclick(event: MouseEvent) {
    this.id = null;
    this.isclick = false;
  }

}
