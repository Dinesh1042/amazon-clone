import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersUpcomingComponent } from './orders-upcoming.component';

describe('OrdersUpcomingComponent', () => {
  let component: OrdersUpcomingComponent;
  let fixture: ComponentFixture<OrdersUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersUpcomingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
