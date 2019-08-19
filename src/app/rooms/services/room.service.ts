import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../models/room';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'local_room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomList: Array<Room> = [];

  private roomListObs = new BehaviorSubject<Array<Room>>([]);

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.roomList = this.storage.get(STORAGE_KEY) || [];
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
}
