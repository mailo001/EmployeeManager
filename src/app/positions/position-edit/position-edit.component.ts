import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PositionService } from '../services/position.service';
import { Position } from '../models/position';

@Component({
  selector: 'app-position-edit',
  templateUrl: './position-edit.component.html',
  styleUrls: ['./position-edit.component.scss']
})
export class PositionEditComponent implements OnInit {

  positionNew: Position;
  positionOld: Position;

  name = '';
  minSalary: number;
  maxSalary: number;

  constructor(
    private router: Router,
    private positionService: PositionService,
    private route: ActivatedRoute
  ) {
    const name = this.route.snapshot.paramMap.get('name');
    this.positionOld = this.positionService.getPosition(name);
    this.positionNew = this.positionOld;

    this.name = this.positionOld.name;
    this.minSalary = this.positionOld.minSalary;
    this.maxSalary = this.positionOld.maxSalary;
  }

  ngOnInit() {
  }

  edit() {
    const positionCon: Position = {
      name: this.name,
      minSalary: this.minSalary,
      maxSalary: this.maxSalary
    };
    this.positionService.edit(this.positionOld, positionCon);
    this.positionOld = this.positionNew;
    this.back();
  }

  back() {
    this.router.navigate(['/positions']);
  }
}
