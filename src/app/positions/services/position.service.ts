import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Position } from '../models/position';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'local_position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private positionList: Array<Position> = [];

  private positionListObs = new BehaviorSubject<Array<Position>>([]);

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.positionList = this.storage.get(STORAGE_KEY) || [];
    this.positionListObs.next(this.positionList);
  }

  getPositionListObs(): Observable<Array<Position>> {
    return this.positionListObs.asObservable();
  }

  getPosition(name: string): Position {
    return this.positionList.find(position => position.name === name);
  }

  add(position: Position) {
    this.positionList.push(position);
    this.positionListObs.next(this.positionList);
    this.storage.set(STORAGE_KEY, this.positionList);
  }

  delate(position: Position) {
    this.positionList = this.positionList.filter(p => p !== position);
    this.positionListObs.next(this.positionList);
    this.storage.set(STORAGE_KEY, this.positionList);
  }

  edit(positionOld: Position, positionNew: Position) {
    this.delate(positionOld);
    this.add(positionNew);
    this.positionListObs.next(this.positionList);
    this.storage.set(STORAGE_KEY, this.positionList);
  }
}
