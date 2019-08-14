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
  maxLoad: number;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {
    const nb = this.route.snapshot.paramMap.get('nb');
    this.roomOld = this.roomService.getRoom(nb);
    this.roomNew = this.roomOld;
  }

  ngOnInit() {
  }

  edit() {
    this.roomService.edit(this.roomOld, this.roomNew);
    this.roomOld = this.roomNew;
    this.back();
  }

  back() {
    this.router.navigate(['/rooms']);
  }

}
