import { TestBed } from '@angular/core/testing';

import { NolCoordinateService } from './coordinate.service';

describe('CoordinateService', () => {
  let service: NolCoordinateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NolCoordinateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
