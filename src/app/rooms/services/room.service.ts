import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../models/room';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Desk } from '../models/desk';

const STORAGE_KEY = 'local_room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomList: Array<Room> = [];

  private roomListObs = new BehaviorSubject<Array<Room>>([]);

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.roomList = this.storage.get(STORAGE_KEY) || [
      {
        nb: 2,
        name: 'Gabinet Dyrektora',
        load: 1,
        maxLoad: 1
      },
      {
        nb: 10,
        name: 'Sala Komputerowa',
        load: 1,
        maxLoad: 10
      },
      {
        nb: 11,
        name: 'Sala Komputerowa',
        load: 1,
        maxLoad: 10
      }
    ];
    this.storage.set(STORAGE_KEY, this.roomList);
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
    this.storage.set(STORAGE_KEY, this.roomList);
  }

  delate(room: Room) {
    this.roomList = this.roomList.filter(r => r !== room);
    this.roomListObs.next(this.roomList);
    this.storage.set(STORAGE_KEY, this.roomList);
  }

  delateByNb(nb: number) {
    this.roomList = this.roomList.filter(r => r.nb !== nb);
    this.roomListObs.next(this.roomList);
    this.storage.set(STORAGE_KEY, this.roomList);
  }

  edit(roomOld: Room, roomNew: Room) {
    this.delate(roomOld);
    this.add(roomNew);
    this.roomListObs.next(this.roomList);
    this.storage.set(STORAGE_KEY, this.roomList);
  }

  addEmpToRoom(num: number) {
    const room: Room = this.getRoom(num);
    this.delate(room);
    room.load += 1;
    this.add(room);
    this.roomListObs.next(this.roomList);
    this.storage.set(STORAGE_KEY, this.roomList);
  }

  delateEmpOfRoom(num: number, id: number) {
    const room: Room = this.getRoom(num);
    this.delate(room);
    room.load -= 1;
    room.desks.forEach((d: Desk) => {
      if (d.employee === true) {
        if (d.empId === id) {
          d.employee = false;
          d.empId = null;
        }
      }
    });
    this.add(room);
    this.roomListObs.next(this.roomList);
    this.storage.set(STORAGE_KEY, this.roomList);
  }
}
