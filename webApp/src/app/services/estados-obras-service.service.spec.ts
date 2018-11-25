import { TestBed } from '@angular/core/testing';

import { EstadosObrasServiceService } from './estados-obras-service.service';

describe('EstadosObrasServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadosObrasServiceService = TestBed.get(EstadosObrasServiceService);
    expect(service).toBeTruthy();
  });
});
