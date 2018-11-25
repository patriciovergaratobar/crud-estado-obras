import { TestBed } from '@angular/core/testing';

import { ProyectoServiceService } from './proyecto-service.service';

describe('ProyectoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProyectoServiceService = TestBed.get(ProyectoServiceService);
    expect(service).toBeTruthy();
  });
});
