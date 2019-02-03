import { TestBed } from '@angular/core/testing';

import { ModelCajasService } from './model-cajas.service';

describe('ModelCajasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelCajasService = TestBed.get(ModelCajasService);
    expect(service).toBeTruthy();
  });
});
