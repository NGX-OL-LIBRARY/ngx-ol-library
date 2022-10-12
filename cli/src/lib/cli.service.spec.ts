import { TestBed } from '@angular/core/testing';

import { CliService } from './cli.service';

describe('CliService', () => {
  let service: CliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
