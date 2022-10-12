import { TestBed } from '@angular/core/testing';

import { ProjService } from './proj.service';

describe('ProjService', () => {
  let service: ProjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
