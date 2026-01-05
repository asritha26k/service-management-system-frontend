import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianApplicationComponent } from './technician-application.component';

describe('TechnicianApplicationComponent', () => {
  let component: TechnicianApplicationComponent;
  let fixture: ComponentFixture<TechnicianApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
