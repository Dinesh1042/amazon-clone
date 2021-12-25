import { TestBed } from '@angular/core/testing';

import { UserCanLoadGuard } from './user-can-load.guard';

describe('UserCanLoadGuard', () => {
  let guard: UserCanLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserCanLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
