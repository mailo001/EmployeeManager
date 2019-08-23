import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddSecondComponent } from './room-add-second.component';

describe('RoomAddSecondComponent', () => {
  let component: RoomAddSecondComponent;
  let fixture: ComponentFixture<RoomAddSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAddSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAddSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
