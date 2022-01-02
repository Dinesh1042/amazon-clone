import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageOrdersComponent } from './admin-manage-orders.component';

describe('AdminManageOrdersComponent', () => {
  let component: AdminManageOrdersComponent;
  let fixture: ComponentFixture<AdminManageOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
