import { TestBed } from '@angular/core/testing';

import { DeleteuserdetailService } from './deleteuserdetail.service';

describe('DeleteuserdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteuserdetailService = TestBed.get(DeleteuserdetailService);
    expect(service).toBeTruthy();
  });
});
