import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';
import { RoomAddService } from '../services/room-add.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss']
})
export class RoomAddComponent implements OnInit {

  num: number;
  name = '';
  maxLoad: number;

  width: number;
  lenght: number;

  null: number;

  err = '';

  constructor(
    private router: Router,
    private roomService: RoomService,
    private rommAddService: RoomAddService
  ) { }

  ngOnInit() {
  }

  next() {
    try {
      if (this.roomService.checkNb(this.num) > 0) {
        throw new Error('Wrong number!');
      }

      const room: Room = {
        nb: this.num,
        name: this.name,
        width: this.width,
        height: this.lenght,
        load: 0,
        maxLoad: this.maxLoad,
        desks: []
      };

      this.rommAddService.setRoom(room);

      this.num = this.null;
      this.name = '';
      this.maxLoad = this.null;
      this.width = this.null;
      this.lenght = this.null;

      this.router.navigate(['/rooms/add/second']);
    } catch (e) {
      this.err = e;
    }

  }

  back() {
    this.router.navigate(['/rooms']);
  }

}

