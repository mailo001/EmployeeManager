import { TestBed } from '@angular/core/testing';

import { RoomAddService } from './room-add.service';

describe('RoomAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomAddService = TestBed.get(RoomAddService);
    expect(service).toBeTruthy();
  });
});
