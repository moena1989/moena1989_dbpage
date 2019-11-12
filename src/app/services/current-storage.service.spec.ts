import { TestBed } from '@angular/core/testing';

import { BeforeAppInitService } from './before-app-init.service';

describe('CurrentStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeforeAppInitService = TestBed.get(BeforeAppInitService);
    expect(service).toBeTruthy();
  });
});
