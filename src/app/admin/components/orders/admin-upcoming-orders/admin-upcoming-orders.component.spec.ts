import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpcomingOrdersComponent } from './admin-upcoming-orders.component';

describe('AdminUpcomingOrdersComponent', () => {
  let component: AdminUpcomingOrdersComponent;
  let fixture: ComponentFixture<AdminUpcomingOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpcomingOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpcomingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
