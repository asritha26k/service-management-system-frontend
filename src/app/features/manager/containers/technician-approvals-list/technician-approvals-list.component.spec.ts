import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianApprovalsListComponent } from './technician-approvals-list.component';

describe('TechnicianApprovalsListComponent', () => {
  let component: TechnicianApprovalsListComponent;
  let fixture: ComponentFixture<TechnicianApprovalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianApprovalsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianApprovalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
