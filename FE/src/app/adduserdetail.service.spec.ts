import { TestBed } from '@angular/core/testing';

import { AdduserdetailService } from './adduserdetail.service';

describe('AdduserdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdduserdetailService = TestBed.get(AdduserdetailService);
    expect(service).toBeTruthy();
  });
});
