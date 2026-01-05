import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServiceRequestsContainerComponent } from './my-service-requests-container.component';

describe('MyServiceRequestsContainerComponent', () => {
  let component: MyServiceRequestsContainerComponent;
  let fixture: ComponentFixture<MyServiceRequestsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyServiceRequestsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyServiceRequestsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
