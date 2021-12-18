import { TestBed } from '@angular/core/testing';

import { EditComponentDeactivateGuard } from './edit-component-deactivate.guard';

describe('EditComponentDeactivateGuard', () => {
  let guard: EditComponentDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditComponentDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
