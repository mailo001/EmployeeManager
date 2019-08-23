import { Component, OnInit } from '@angular/core';
import { RoomAddService } from '../services/room-add.service';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-room-add-second',
  templateUrl: './room-add-second.component.html',
  styleUrls: ['./room-add-second.component.scss']
})
export class RoomAddSecondComponent implements OnInit {

  room: Room;
  err = '';

  constructor(
    private roomService: RoomService,
    private roomAddService: RoomAddService,
    private router: Router
  ) {
    this.roomAddService.getRoomObs().subscribe(room => this.room = room);
  }

  ngOnInit() {
  }

  addDesk() {
    if (this.room.maxLoad > this.room.desks.length) {
      this.roomAddService.addNewDesk();
    } else {
      this.err = 'Max Load';
    }
  }

  addRoom() {
    if (this.room.maxLoad === this.room.desks.length) {
      this.roomService.add(this.room);
      this.router.navigate(['/rooms']);
    } else {
      this.err = 'Too few desks';
    }
  }

  back() {
    this.router.navigate(['/rooms/add']);
  }

}
