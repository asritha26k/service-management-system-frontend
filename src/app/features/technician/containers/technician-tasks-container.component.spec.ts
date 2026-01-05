import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianTasksContainerComponent } from './technician-tasks-container.component';

describe('TechnicianTasksContainerComponent', () => {
  let component: TechnicianTasksContainerComponent;
  let fixture: ComponentFixture<TechnicianTasksContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianTasksContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianTasksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
