import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDashboardContainerComponent } from './customer-dashboard-container.component';

describe('CustomerDashboardContainerComponent', () => {
  let component: CustomerDashboardContainerComponent;
  let fixture: ComponentFixture<CustomerDashboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDashboardContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
