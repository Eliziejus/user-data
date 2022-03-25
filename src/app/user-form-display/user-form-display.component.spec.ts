import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormDisplayComponent } from './user-form-display.component';

describe('UserFormDisplayComponent', () => {
  let component: UserFormDisplayComponent;
  let fixture: ComponentFixture<UserFormDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
