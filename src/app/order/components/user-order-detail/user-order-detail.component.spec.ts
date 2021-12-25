import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderDetailComponent } from './user-order-detail.component';

describe('UserOrderDetailComponent', () => {
  let component: UserOrderDetailComponent;
  let fixture: ComponentFixture<UserOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
