import { TestBed } from '@angular/core/testing';

import { ArchivoServiceService } from './archivo-service.service';

describe('ArchivoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchivoServiceService = TestBed.get(ArchivoServiceService);
    expect(service).toBeTruthy();
  });
});
