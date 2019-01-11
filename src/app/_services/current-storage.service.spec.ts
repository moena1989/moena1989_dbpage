import { TestBed } from '@angular/core/testing';

import { CurrentStorageService } from './current-storage.service';

describe('CurrentStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentStorageService = TestBed.get(CurrentStorageService);
    expect(service).toBeTruthy();
  });
});
