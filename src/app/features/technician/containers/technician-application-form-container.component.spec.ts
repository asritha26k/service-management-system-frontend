import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianApplicationFormContainerComponent } from './technician-application-form-container.component';

describe('TechnicianApplicationFormContainerComponent', () => {
  let component: TechnicianApplicationFormContainerComponent;
  let fixture: ComponentFixture<TechnicianApplicationFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianApplicationFormContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianApplicationFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
