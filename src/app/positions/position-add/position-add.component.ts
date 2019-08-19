import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PositionService } from '../services/position.service';
import { Position } from '../models/position';

@Component({
  selector: 'app-position-add',
  templateUrl: './position-add.component.html',
  styleUrls: ['./position-add.component.scss']
})
export class PositionAddComponent implements OnInit {

  name = '';
  minSalary: number;
  maxSalary: number;

  null: number;

  constructor(
    private router: Router,
    private positionService: PositionService
  ) { }

  ngOnInit() {
  }

  add() {
    const position: Position = {
      name: this.name,
      minSalary: this.minSalary,
      maxSalary: this.maxSalary
    };

    this.positionService.add(position);

    this.name = '';
    this.maxSalary = this.null;
    this.minSalary = this.null;
  }

  back() {
    this.router.navigate(['/positions']);
  }
}
