import { TestBed } from '@angular/core/testing';

import { GetuserdetailService } from './getuserdetail.service';

describe('GetuserdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetuserdetailService = TestBed.get(GetuserdetailService);
    expect(service).toBeTruthy();
  });
});
