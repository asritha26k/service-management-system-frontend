import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAssignTechnicianComponent } from './manager-assign-technician.component';

describe('ManagerAssignTechnicianComponent', () => {
  let component: ManagerAssignTechnicianComponent;
  let fixture: ComponentFixture<ManagerAssignTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAssignTechnicianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAssignTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
