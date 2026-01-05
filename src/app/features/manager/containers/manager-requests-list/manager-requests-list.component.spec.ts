import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRequestsListComponent } from './manager-requests-list.component';

describe('ManagerRequestsListComponent', () => {
  let component: ManagerRequestsListComponent;
  let fixture: ComponentFixture<ManagerRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerRequestsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
