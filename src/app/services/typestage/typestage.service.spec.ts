import { TestBed } from '@angular/core/testing';

import { TypestageService } from './typestage.service';

describe('TypestageService', () => {
  let service: TypestageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypestageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
