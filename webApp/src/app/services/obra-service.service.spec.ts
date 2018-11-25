import { TestBed } from '@angular/core/testing';

import { ObraServiceService } from './obra-service.service';

describe('ObraServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObraServiceService = TestBed.get(ObraServiceService);
    expect(service).toBeTruthy();
  });
});
