import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomAddComponent } from './room-add/room-add.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { FormsModule } from '@angular/forms';
import { RoomCreateComponent } from './room-create/room-create.component';
import { RoomAddSecondComponent } from './room-add-second/room-add-second.component';


@NgModule({
  declarations: [RoomListComponent, RoomAddComponent, RoomEditComponent, RoomCreateComponent, RoomAddSecondComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,
    FormsModule
  ]
})
export class RoomModule { }
