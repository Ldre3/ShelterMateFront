import { TestBed } from '@angular/core/testing';

import { PerrolistService } from './perrolist.service';

describe('PerrolistService', () => {
  let service: PerrolistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerrolistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
