import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyOrderComponent } from './empty-order.component';

describe('EmptyOrderComponent', () => {
  let component: EmptyOrderComponent;
  let fixture: ComponentFixture<EmptyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
