import { TestBed } from '@angular/core/testing';

import { DbManagerFirestoreService } from './db-manager-firestore.service';

describe('DbManagerFirestoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbManagerFirestoreService = TestBed.get(DbManagerFirestoreService);
    expect(service).toBeTruthy();
  });
});
