import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianTasksComponent } from './technician-tasks.component';

describe('TechnicianTasksComponent', () => {
  let component: TechnicianTasksComponent;
  let fixture: ComponentFixture<TechnicianTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
