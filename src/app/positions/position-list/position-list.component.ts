import { Component, OnInit } from '@angular/core';
import { PositionService } from '../services/position.service';
import { Router } from '@angular/router';
import { Position } from '../models/position';


@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit {

  positionList: Array<Position> = [ ];

  constructor(
      private positionService: PositionService,
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
    this.positionService.delate(position);
  }
}
