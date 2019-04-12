import { TestBed } from '@angular/core/testing';

import { HasherService } from './hasher.service';

describe('HasherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HasherService = TestBed.get(HasherService);
    expect(service).toBeTruthy();
  });
});
