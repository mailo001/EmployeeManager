import { Component, OnInit } from '@angular/core';
import { Room } from '../models/room';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  roomList: Array<Room> = [ ];

  constructor(
      private roomService: RoomService,
      private router: Router
    ) {
    roomService.getRoomListObs().subscribe(
      (rooms: Array<Room>) => { this.roomList = rooms; }
    );
  }

  ngOnInit() { }

  roomEdit(room: Room) {
    this.router.navigate(['/room', room.nb]);
  }

  roomDelete(room: Room) {
    this.roomService.delate(room);
  }
}
