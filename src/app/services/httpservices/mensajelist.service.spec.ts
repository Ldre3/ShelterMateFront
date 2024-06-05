import { TestBed } from '@angular/core/testing';

import { MensajelistService } from './mensajelist.service';

describe('MensajelistService', () => {
  let service: MensajelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
