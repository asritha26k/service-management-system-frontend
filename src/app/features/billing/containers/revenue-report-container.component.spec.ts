import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueReportContainerComponent } from './revenue-report-container.component';

describe('RevenueReportContainerComponent', () => {
  let component: RevenueReportContainerComponent;
  let fixture: ComponentFixture<RevenueReportContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueReportContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueReportContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
