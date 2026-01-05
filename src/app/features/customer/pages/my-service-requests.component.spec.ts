import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServiceRequestsComponent } from './my-service-requests.component';

describe('MyServiceRequestsComponent', () => {
  let component: MyServiceRequestsComponent;
  let fixture: ComponentFixture<MyServiceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyServiceRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyServiceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
