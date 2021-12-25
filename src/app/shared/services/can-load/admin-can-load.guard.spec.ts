import { TestBed } from '@angular/core/testing';

import { AdminCanLoadGuard } from './admin-can-load.guard';

describe('AdminCanLoadGuard', () => {
  let guard: AdminCanLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminCanLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
