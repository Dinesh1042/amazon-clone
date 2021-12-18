import { TestBed } from '@angular/core/testing';

import { AuthSuccessService } from './auth-success.service';

describe('AuthSuccessService', () => {
  let service: AuthSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
