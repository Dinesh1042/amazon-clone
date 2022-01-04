import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImageEditComponent } from './user-image-edit.component';

describe('UserImageEditComponent', () => {
  let component: UserImageEditComponent;
  let fixture: ComponentFixture<UserImageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserImageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
