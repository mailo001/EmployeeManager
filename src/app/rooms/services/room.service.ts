import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../models/room';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomList: Array<Room> = [
    {
      nb: 3,
      name: 'Z komputerami',
      load: 1,
      maxLoad: 15
    },
    {
      nb: 15,
      name: 'Socialny',
      load: 1,
      maxLoad: 5
    }
  ];

  private roomListObs = new BehaviorSubject<Array<Room>>([]);

  constructor() {
    this.roomListObs.next(this.roomList);
  }

  getRoomListObs(): Observable<Array<Room>> {
    return this.roomListObs.asObservable();
  }

  getRoom(nb: number | string): Room {
    return this.roomList.find(room => room.nb === +nb);
  }

  add(room: Room) {
    this.roomList.push(room);
    this.roomListObs.next(this.roomList);
  }

  delate(room: Room) {
    this.roomList = this.roomList.filter(r => r !== room);
    this.roomListObs.next(this.roomList);
  }

  edit(roomOld: Room, roomNew: Room) {
    this.delate(roomOld);
    this.add(roomNew);
    this.roomListObs.next(this.roomList);
  }
}
