import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianApprovalsComponent } from './technician-approvals.component';

describe('TechnicianApprovalsComponent', () => {
  let component: TechnicianApprovalsComponent;
  let fixture: ComponentFixture<TechnicianApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianApprovalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
