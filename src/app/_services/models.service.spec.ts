import { TestBed } from '@angular/core/testing';

import { RelojModelService } from './reloj-model.service';

describe('RelojModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelojModelService = TestBed.get(RelojModelService);
    expect(service).toBeTruthy();
  });
});
