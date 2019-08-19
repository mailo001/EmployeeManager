import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private positionList: Array<Position> = [
    {
      name: 'Programista',
      minSalary: 3000,
      maxSalary: 10000
    },
    {
      name: 'Pracownik Socialny',
      minSalary: 2000,
      maxSalary: 5000
    }
  ];

  private positionListObs = new BehaviorSubject<Array<Position>>([]);

  constructor() {
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
  }

  delate(position: Position) {
    this.positionList = this.positionList.filter(p => p !== position);
    this.positionListObs.next(this.positionList);
  }

  edit(positionOld: Position, positionNew: Position) {
    this.delate(positionOld);
    this.add(positionNew);
    this.positionListObs.next(this.positionList);
  }
}
