import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormContainerComponent } from './login-form.component';

describe('LoginFormContainerComponent', () => {
  let component: LoginFormContainerComponent;
  let fixture: ComponentFixture<LoginFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
