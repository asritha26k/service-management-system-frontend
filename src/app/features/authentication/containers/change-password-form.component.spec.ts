import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordFormContainerComponent } from './change-password-form.component';

describe('ChangePasswordFormContainerComponent', () => {
  let component: ChangePasswordFormContainerComponent;
  let fixture: ComponentFixture<ChangePasswordFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordFormContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
