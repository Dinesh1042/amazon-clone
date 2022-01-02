import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompletedOrdersComponent } from './admin-completed-orders.component';

describe('AdminCompletedOrdersComponent', () => {
  let component: AdminCompletedOrdersComponent;
  let fixture: ComponentFixture<AdminCompletedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCompletedOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompletedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
