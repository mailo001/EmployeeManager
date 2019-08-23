import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {

  roomNew: Room;
  roomOld: Room;

  num: number;
  name = '';
  load: number;
  maxLoad: number;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {
    const nb = this.route.snapshot.paramMap.get('nb');
    this.roomOld = this.roomService.getRoom(nb);
    this.roomNew = this.roomOld;

    this.num = this.roomOld.nb;
    this.name = this.roomOld.name;
    this.load = this.roomOld.load;
    this.maxLoad = this.roomOld.maxLoad;
  }

  ngOnInit() {
  }

  edit() {
    const roomCon: Room = {
      nb: this.num,
      name: this.name,
      weidth: this.roomOld.weidth,
      height: this.roomOld.height,
      load: this.load,
      maxLoad: this.maxLoad,
      desks: this.roomOld.desks
    };
    this.roomService.edit(this.roomOld, roomCon);
    this.roomOld = this.roomNew;
    this.back();
  }

  back() {
    this.router.navigate(['/rooms']);
  }

}
