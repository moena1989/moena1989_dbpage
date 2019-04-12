import { TestBed } from '@angular/core/testing';

import { DbMainService } from './db-main.service';

describe('DbMainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbMainService = TestBed.get(DbMainService);
    expect(service).toBeTruthy();
  });
});
