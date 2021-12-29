import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourAddressesComponent } from './your-addresses.component';

describe('YourAddressesComponent', () => {
  let component: YourAddressesComponent;
  let fixture: ComponentFixture<YourAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourAddressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
