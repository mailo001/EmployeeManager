import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../models/room';
import { Desk } from '../models/desk';

@Injectable({
  providedIn: 'root'
})
export class RoomAddService {

  private room: Room;
  private roomObs = new BehaviorSubject<Room>(this.room);

  constructor() {
    this.roomObs.next(this.room);
  }

  setRoom(room: Room) {
    this.room = room;
    this.roomObs.next(this.room);
  }

  uppdateDesks(desks: Array<Desk>) {
    this.room.desks = desks;
    this.room.load = this.room.desks.filter(d => d.employee === true).length;
    this.roomObs.next(this.room);
  }

  addNewDesk() {
    const desk: Desk = {
      id: this.room.desks.length,
      x: this.room.width / 2 - 10,
      y: this.room.height / 2 - 10,
      rotate: 0,
      colision: true,
      employee: false
    };
    this.room.desks.push(desk);
    this.roomObs.next(this.room);
  }

  getRoomObs(): Observable<Room> {
    return this.roomObs.asObservable();
  }

}
