import { TestBed } from '@angular/core/testing';

import { DataEmployeeService } from './data-employee.service';

describe('DataEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataEmployeeService = TestBed.get(DataEmployeeService);
    expect(service).toBeTruthy();
  });
});
