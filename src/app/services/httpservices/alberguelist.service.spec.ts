import { TestBed } from '@angular/core/testing';

import { AlberguelistService } from './alberguelist.service';

describe('AlberguelistService', () => {
  let service: AlberguelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlberguelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
