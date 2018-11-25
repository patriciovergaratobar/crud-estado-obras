import { TestBed } from '@angular/core/testing';

import { UsuarioServiceService } from './usuario-service.service';

describe('UsuarioServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioServiceService = TestBed.get(UsuarioServiceService);
    expect(service).toBeTruthy();
  });
});
