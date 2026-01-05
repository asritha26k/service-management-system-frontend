import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDashboardContainerComponent } from './manager-dashboard-container.component';

describe('ManagerDashboardContainerComponent', () => {
  let component: ManagerDashboardContainerComponent;
  let fixture: ComponentFixture<ManagerDashboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDashboardContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
