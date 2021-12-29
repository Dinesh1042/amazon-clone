import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressFormComponent } from './user-address-form.component';

describe('UserAddressFormComponent', () => {
  let component: UserAddressFormComponent;
  let fixture: ComponentFixture<UserAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddressFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
