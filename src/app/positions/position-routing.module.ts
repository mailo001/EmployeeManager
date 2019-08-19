import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionListComponent } from './position-list/position-list.component';
import { PositionEditComponent } from './position-edit/position-edit.component';
import { PositionAddComponent } from './position-add/position-add.component';


const routes: Routes = [
  { path: 'positions', component: PositionListComponent },
  { path: 'position/:name', component: PositionEditComponent },
  { path: 'positions/add', component: PositionAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule { }
