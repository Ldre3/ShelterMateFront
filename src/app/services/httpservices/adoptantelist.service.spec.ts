import { TestBed } from '@angular/core/testing';

import { AdoptantelistService } from './adoptantelist.service';

describe('AdoptantelistService', () => {
  let service: AdoptantelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptantelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
