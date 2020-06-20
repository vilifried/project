import { TestBed } from '@angular/core/testing';

import { CatfactService } from './catfact.service';

describe('CatfactService', () => {
  let service: CatfactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatfactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
