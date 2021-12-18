import { TestBed } from '@angular/core/testing';

import { AuthErrorService } from './auth-error.service';

describe('AuthErrorService', () => {
  let service: AuthErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
