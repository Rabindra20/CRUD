import { TestBed } from '@angular/core/testing';

import { UpdateuserdetailService } from './updateuserdetail.service';

describe('UpdateuserdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateuserdetailService = TestBed.get(UpdateuserdetailService);
    expect(service).toBeTruthy();
  });
});
