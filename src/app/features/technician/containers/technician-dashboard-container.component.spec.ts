import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianDashboardContainerComponent } from './technician-dashboard-container.component';

describe('TechnicianDashboardContainerComponent', () => {
  let component: TechnicianDashboardContainerComponent;
  let fixture: ComponentFixture<TechnicianDashboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianDashboardContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianDashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
