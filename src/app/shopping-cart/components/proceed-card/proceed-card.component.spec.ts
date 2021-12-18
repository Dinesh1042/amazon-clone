import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedCardComponent } from './proceed-card.component';

describe('ProceedCardComponent', () => {
  let component: ProceedCardComponent;
  let fixture: ComponentFixture<ProceedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
