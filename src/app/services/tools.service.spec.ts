import { TestBed } from '@angular/core/testing';

import { ToolsServices } from './tools-services.service';

describe('ToolsServices', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolsServices = TestBed.get(ToolsServices);
    expect(service).toBeTruthy();
  });
});
