import { Component, OnInit } from '@angular/core';
import { Room } from '../models/room';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';
import { RoomAddService } from '../services/room-add.service';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit {

  roomNew: Room;
  roomOld: Room;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private roomAddService: RoomAddService,
    private route: ActivatedRoute
  ) {
    const nb = this.route.snapshot.paramMap.get('nb');
    this.roomOld = this.roomService.getRoom(nb);
    this.roomNew = this.roomOld;

    this.roomAddService.setRoom(this.roomOld);
  }

  ngOnInit() {
  }

  edit() {
  }

  back() {
    this.router.navigate(['/rooms']);
  }

}
