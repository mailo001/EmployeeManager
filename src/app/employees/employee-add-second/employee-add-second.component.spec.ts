import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddSecondComponent } from './employee-add-second.component';

describe('EmployeeAddSecondComponent', () => {
  let component: EmployeeAddSecondComponent;
  let fixture: ComponentFixture<EmployeeAddSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
