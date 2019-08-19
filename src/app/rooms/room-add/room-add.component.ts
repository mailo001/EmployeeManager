import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss']
})
export class RoomAddComponent implements OnInit {

  num: number;
  name = '';
  maxLoad: number;

  null: number;

  constructor(
    private router: Router,
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

  add() {
    const room: Room = {
      nb: this.num,
      name:  this.name,
      load: 0,
      maxLoad: this.maxLoad
    };

    this.roomService.add(room);

    this.num = this.null;
    this.name = '';
    this.maxLoad = this.null;
  }

  back() {
    this.router.navigate(['/rooms']);
  }

}
