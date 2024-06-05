import { TestBed } from '@angular/core/testing';

import { AlbergueServiceService } from './albergue-service.service';

describe('AlbergueServiceService', () => {
  let service: AlbergueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbergueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
