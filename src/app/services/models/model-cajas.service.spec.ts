import { TestBed } from '@angular/core/testing';

import { ModelsSevice } from './model-cajas.service';

describe('ModelsSevice', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelsSevice = TestBed.get(ModelsSevice);
    expect(service).toBeTruthy();
  });
});
