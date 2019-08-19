import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionRoutingModule } from './position-routing.module';
import { PositionListComponent } from './position-list/position-list.component';
import { PositionAddComponent } from './position-add/position-add.component';
import { PositionEditComponent } from './position-edit/position-edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PositionListComponent, PositionAddComponent, PositionEditComponent],
  imports: [
    CommonModule,
    PositionRoutingModule,
    FormsModule
  ]
})
export class PositionModule { }
