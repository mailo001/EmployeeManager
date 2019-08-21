import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomAddComponent } from './room-add/room-add.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { RoomCreateComponent } from './room-create/room-create.component';


const routes: Routes = [
  { path: 'rooms', component: RoomListComponent },
  { path: 'room/:nb', component: RoomEditComponent },
  { path: 'rooms/add', component: RoomAddComponent },
  { path: 'rooms/add/create', component: RoomCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
