import { Component, OnInit } from '@angular/core';
import { PositionService } from '../services/position.service';
import { Router } from '@angular/router';
import { Position } from '../models/position';
import { DataEmployeeService } from 'src/app/employees/services/data-employee.service';


@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit {

  positionList: Array<Position> = [ ];

  err = '';

  constructor(
      private positionService: PositionService,
      private empService: DataEmployeeService,
      private router: Router
    ) {
    positionService.getPositionListObs().subscribe(
      (positions: Array<Position>) => { this.positionList = positions; }
    );
  }

  ngOnInit() { }

  positionEdit(position: Position) {
    this.router.navigate(['/position', position.name]);
  }

  positionDelete(position: Position) {
    try {
      if (this.empService.isPosFree(position.name) === false) {
        throw new Error('Position is not empty');
      }
      this.positionService.delate(position);
    } catch (e) {
      this.err = e;
    }
  }
}
