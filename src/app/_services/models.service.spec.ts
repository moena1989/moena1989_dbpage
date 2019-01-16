import { TestBed } from '@angular/core/testing';

import { ModelRelojService } from './model-reloj.service';

describe('ModelRelojService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelRelojService = TestBed.get(ModelRelojService);
    expect(service).toBeTruthy();
  });
});
