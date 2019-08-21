import { Component, OnInit } from '@angular/core';
import { Desk } from '../models/desk';
import { count } from 'console';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {

  pos: Array<Desk> = [{x: 10, y: 10}, { x: 10, y: 100 }];

  width = 40;
  height = 60;

  isclick = false;
  colision = false;



  constructor() { }

  ngOnInit() {
  }

  clik(event: MouseEvent) {
    this.isclick = true;
  }

  move(event: MouseEvent) {

    if (this.isclick) {

      let c = 0;
      this.pos.forEach(desk => {
        if (
          // tslint:disable-next-line: deprecation
          desk.x <= this.pos[+event.toElement.id].x + event.movementX + this.width &&
          // tslint:disable-next-line: deprecation
          this.pos[+event.toElement.id].x + event.movementX <= desk.x + this.width &&
          // tslint:disable-next-line: deprecation
          desk.y <= this.pos[+event.toElement.id].y + event.movementY + this.height &&
          // tslint:disable-next-line: deprecation
          this.pos[+event.toElement.id].y + event.movementY <= desk.y + this.height
        ) {
          c++;
        }
      });

      if (c === 1) {
        // tslint:disable-next-line: deprecation
        this.pos[+event.toElement.id].x += event.movementX;
        // tslint:disable-next-line: deprecation
        this.pos[+event.toElement.id].y += event.movementY;
      }
    }
  }

  unclick(event: MouseEvent) {
    this.isclick = false;
  }

}
