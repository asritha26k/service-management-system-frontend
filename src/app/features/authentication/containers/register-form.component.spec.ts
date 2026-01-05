import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormContainerComponent } from './register-form.component';

describe('RegisterFormContainerComponent', () => {
  let component: RegisterFormContainerComponent;
  let fixture: ComponentFixture<RegisterFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
